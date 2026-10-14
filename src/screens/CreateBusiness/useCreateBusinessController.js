import { useRoute } from "@react-navigation/native"
import { setIn, useFormik } from "formik"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { BUSINESS_DAYS } from "../../helpers/data"
import { convertToFormData } from "../../helpers/general"
import { getCountryCodeByName, getStateCodeByName } from "../../helpers/location"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"
import {
    useCreateBusinessMutation,
    useGetBusinessByIdQuery,
    useUpdateBusinessMutation,
} from "../../redux/apis/Business"
import { useGetBusinessCategoriesQuery } from "../../redux/apis/BusinessCategory"
import { selectUser } from "../../redux/selectors"

export const FORM_STEPS = [
    {
        key: "basic",
        title: "Basic Information",
        subtitle: "Upload media and tell us about your business",
    },
    {
        key: "contact",
        title: "Contact",
        subtitle: "Phone, email, and website",
    },
    {
        key: "address",
        title: "Address",
        subtitle: "Where your business is located",
    },
    {
        key: "hours",
        title: "Hours",
        subtitle: "Set your weekly schedule",
    },
]

const file_schema = Yup.mixed()
    .required("Image is required")
    .test("file", "Please upload an image", (value) => Boolean(value?.uri || (typeof value === "string" && value)))

const step_schemas = [
    Yup.object({
        logo: file_schema,
        image: file_schema,
        name: Yup.string()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name must not exceed 100 characters")
            .required("Business name is required"),
        description: Yup.string()
            .min(10, "Description must be at least 10 characters")
            .required("Description is required"),
        category: Yup.object({
            id: Yup.string().required("Category is required"),
            name: Yup.string(),
        }).nullable().required("Category is required"),
    }),
    Yup.object({
        email: Yup.string()
            .transform((value) => value || null)
            .email("Invalid email format")
            .nullable(),
        country_code: Yup.string()
            .required("Country code is required"),
        dialing_code: Yup.string()
            .required("Dialing code is required"),
        phone: Yup.string()
            .matches(/^[0-9+\-\s()]*$/, "Invalid phone number format")
            .min(10, "Phone number must be at least 10 digits")
            .required("Phone number is required"),
        website: Yup.string()
            .transform((value) => value || null)
            .url("Invalid website URL")
            .nullable(),
    }),
    Yup.object({
        address: Yup.object().shape({
            formatted: Yup.string().required("Street address is required"),
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            city: Yup.string().required("City is required"),
        }),
    }),
    Yup.object({
        hours: Yup.array(),
    }),
]

const create_business_schema = step_schemas.reduce(
    (schema, step_schema) => schema.concat(step_schema),
    Yup.object(),
)

const createDefaultHours = () => BUSINESS_DAYS.map((day) => ({
    day,
    open: new Date(2024, 0, 1, 9, 0),
    close: new Date(2024, 0, 1, 21, 0),
    closed: false,
}))

const parseTime = (value) => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value

    if (!value || typeof value !== "string") {
        return new Date(2024, 0, 1, 9, 0)
    }

    const [hours, minutes] = value.split(":").map(Number)

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return new Date(2024, 0, 1, 9, 0)
    }

    return new Date(2024, 0, 1, hours, minutes)
}

const mapHoursFromBusiness = (hours = []) => {
    const by_day = Object.fromEntries(
        (Array.isArray(hours) ? hours : []).map((hour) => [hour.day, hour]),
    )

    return BUSINESS_DAYS.map((day) => {
        const existing = by_day[day]

        if (!existing) {
            return {
                day,
                open: new Date(2024, 0, 1, 9, 0),
                close: new Date(2024, 0, 1, 21, 0),
                closed: false,
            }
        }

        return {
            day,
            open: parseTime(existing.open),
            close: parseTime(existing.close),
            closed: Boolean(existing.closed),
        }
    })
}

const formatTime = (value) => {
    if (!value) return ""
    const date = new Date(value)
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
}

const applyValidationErrors = (formik, error) => {
    if (!error?.inner?.length) return

    let errors = { ...formik.errors }
    let touched = { ...formik.touched }

    error.inner.forEach(({ path, message }) => {
        errors = setIn(errors, path, message)
        touched = setIn(touched, path, true)
    })

    formik.setErrors(errors)
    formik.setTouched(touched, true)
}

const useCreateBusinessController = () => {

    const { params } = useRoute()
    const business_id = params?._id
    const is_edit = Boolean(business_id)

    const user = useSelector(selectUser)
    const { showInfoModal } = useModal()

    const { value: image_modal, toggle: toggleImageModal } = useToggle()

    const image_field_ref = useRef(null)
    const [current_step, setCurrentStep] = useState(0)

    const [create, { isSuccess: is_created, isLoading: is_creating }] = useCreateBusinessMutation()
    const [update, { isSuccess: is_updated, isLoading: is_updating }] = useUpdateBusinessMutation()

    const {
        data: business_response,
        isLoading: business_loading,
    } = useGetBusinessByIdQuery(business_id, { skip: !is_edit })

    const business = business_response?.data

    const {
        data: categories_response,
        isLoading: categories_loading,
    } = useGetBusinessCategoriesQuery()

    const categories = categories_response?.data ?? []

    const empty_initial = useMemo(() => ({
        name: "",
        description: "",
        category: null,
        email: user?.email || "",
        country_code: user?.country_code || "US",
        dialing_code: user?.dialing_code || "+1",
        phone: user?.phone || "",
        website: "",
        address: {
            formatted: "",
            country: "",
            country_code: "",
            state: "",
            state_code: "",
            city: "",
            latitude: 0,
            longitude: 0,
        },
        logo: null,
        image: null,
        hours: createDefaultHours(),
    }), [user])

    const initial = useMemo(() => {

        if (!business) return empty_initial

        const country_name = business.address?.country || ""
        const state_name = business.address?.state || ""
        const country_code = getCountryCodeByName(country_name)
        const state_code = getStateCodeByName(country_code, state_name)

        const logo_url = business.logo_url || business.logo
        const image_url = business.image_url || business.image

        return {
            name: business.name || "",
            description: business.description || "",
            category: business.category?._id
                ? {
                    id: String(business.category._id),
                    name: business.category.name || "",
                }
                : null,
            email: business.email || "",
            country_code: business.country_code || "US",
            dialing_code: business.dialing_code || "+1",
            phone: business.phone || "",
            website: business.website || "",
            address: {
                formatted: business.address?.formatted || "",
                country: country_name,
                country_code,
                state: state_name,
                state_code,
                city: business.address?.city || "",
                latitude: business.address?.latitude ?? 0,
                longitude: business.address?.longitude ?? 0,
            },
            logo: logo_url ? { uri: logo_url } : null,
            image: image_url ? { uri: image_url } : null,
            hours: mapHoursFromBusiness(business.hours),
        }

    }, [business, empty_initial])

    const formik = useFormik({
        initialValues: initial,
        enableReinitialize: true,
        validationSchema: create_business_schema,
        onSubmit: async (values) => {

            const payload_values = {
                name: values.name,
                description: values.description,
                category: values.category?.id,
                email: values.email || undefined,
                phone: values.phone,
                country_code: values.country_code,
                dialing_code: values.dialing_code,
                website: values.website || undefined,
                address: {
                    formatted: values.address.formatted,
                    country: values.address.country,
                    state: values.address.state,
                    city: values.address.city,
                    latitude: values.address.latitude ?? 0,
                    longitude: values.address.longitude ?? 0,
                },
                hours: values.hours.map(({ day, open, close, closed }) => ({
                    day,
                    open: closed ? "" : formatTime(open),
                    close: closed ? "" : formatTime(close),
                    closed,
                })),
            }

            if (!is_edit || values.logo?.type) {
                payload_values.logo = values.logo
            }

            if (!is_edit || values.image?.type) {
                payload_values.image = values.image
            }

            const payload = convertToFormData(payload_values)

            if (is_edit) update({ id: business_id, body: payload })
            else create(payload)

        },
    })

    useEffect(() => {
        if (!is_created && !is_updated) return

        showInfoModal({
            title: "Thank You!",
            message: is_edit
                ? "Your business has been updated successfully"
                : "Your business has been submitted successfully",
            onConfirm: goBack,
        })
    }, [is_created, is_edit, is_updated])

    const { openCamera, openGallery } = useImagePicker({
        onImageSelected: (selected) => {
            if (image_field_ref.current) {
                formik.setFieldValue(image_field_ref.current, selected)
            }
        },
    })

    const onOpenImagePicker = useCallback((field) => {
        image_field_ref.current = field
        toggleImageModal()
    }, [toggleImageModal])

    const onUpdateHour = useCallback((index, key, value) => {
        formik.setFieldValue(`hours[${index}].${key}`, value)
    }, [formik])

    const validateCurrentStep = useCallback(async () => {
        try {
            await step_schemas[current_step].validate(formik.values, { abortEarly: false })
            return true
        } catch (error) {
            applyValidationErrors(formik, error)
            return false
        }
    }, [current_step, formik])

    const onNext = useCallback(async () => {
        const is_valid = await validateCurrentStep()
        if (!is_valid) return

        setCurrentStep((step) => Math.min(step + 1, FORM_STEPS.length - 1))
    }, [validateCurrentStep])

    const onBack = useCallback(() => {
        setCurrentStep((step) => Math.max(step - 1, 0))
    }, [])

    const is_first_step = current_step === 0
    const is_last_step = current_step === FORM_STEPS.length - 1

    return {
        values: {
            formik,
            is_edit,
            is_loading: is_creating || is_updating,
            business_loading: is_edit && business_loading,
            image_modal,
            categories,
            categories_loading,
            current_step,
            step: FORM_STEPS[current_step],
            total_steps: FORM_STEPS.length,
            is_first_step,
            is_last_step,
        },
        functions: {
            toggleImageModal,
            onOpenImagePicker,
            openCamera,
            openGallery,
            onUpdateHour,
            onNext,
            onBack,
        },
    }
}

export default useCreateBusinessController
