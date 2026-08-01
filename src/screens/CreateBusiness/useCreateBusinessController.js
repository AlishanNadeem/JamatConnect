import { setIn, useFormik } from "formik"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { BUSINESS_DAYS } from "../../helpers/data"
import { convertToFormData } from "../../helpers/general"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"
import { useCreateBusinessMutation } from "../../redux/apis/Business"
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
    .test("file", "Please upload an image", (value) => Boolean(value?.uri))

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

    const user = useSelector(selectUser)
    const { showInfoModal } = useModal()

    const { value: image_modal, toggle: toggleImageModal } = useToggle()

    const image_field_ref = useRef(null)
    const [current_step, setCurrentStep] = useState(0)

    const [submit, { isSuccess, isLoading }] = useCreateBusinessMutation()

    const {
        data: categories_response,
        isLoading: categories_loading,
    } = useGetBusinessCategoriesQuery()

    const categories = categories_response?.data ?? []

    const initial = {
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
            state: "",
            city: "",
        },
        logo: null,
        image: null,
        hours: createDefaultHours(),
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: create_business_schema,
        onSubmit: async (values) => {

            const payload = convertToFormData({
                name: values.name,
                description: values.description,
                category: values.category?.id,
                email: values.email || undefined,
                phone: values.phone,
                country_code: values.country_code,
                dialing_code: values.dialing_code,
                website: values.website || undefined,
                address: {
                    ...values.address,
                    latitude: 0,
                    longitude: 0,
                },
                hours: values.hours.map(({ day, open, close, closed }) => ({
                    day,
                    open: closed ? "" : formatTime(open),
                    close: closed ? "" : formatTime(close),
                    closed,
                })),
                logo: values.logo,
                image: values.image,
            })

            submit(payload)

        },
    })

    useEffect(() => {
        if (isSuccess) {
            showInfoModal({
                title: "Thank You!",
                message: "Your business has been submitted successfully",
                onConfirm: goBack,
            })
        }
    }, [isSuccess])

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
            is_loading: isLoading,
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
