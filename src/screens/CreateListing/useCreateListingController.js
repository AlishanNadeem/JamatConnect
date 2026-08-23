import { useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { convertToFormData } from "../../helpers/general"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"
import {
    useCreateListingMutation,
    useGetListingByIdQuery,
    useUpdateListingMutation,
} from "../../redux/apis/Marketplace"
import { useGetProductCategoriesQuery } from "../../redux/apis/ProductCategory"

const file_schema = Yup.mixed()
    .required("Image is required")
    .test("file", "Please upload an image", (value) => Boolean(value?.uri || (typeof value === "string" && value)))

const create_listing_schema = Yup.object({
    image: file_schema,
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .required("Name is required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .required("Description is required"),
    category: Yup.object({
        value: Yup.string().required("Category is required"),
        label: Yup.string(),
    }).nullable().required("Category is required"),
    price: Yup.number()
        .transform((value, original) => (original === "" || original === null ? undefined : Number(original)))
        .typeError("Enter a valid price")
        .min(0, "Price cannot be negative")
        .required("Price is required"),
})

const empty_initial = {
    name: "",
    description: "",
    category: null,
    price: "",
    image: null,
}

const useCreateListingController = () => {

    const { params } = useRoute()
    const listing_id = params?._id
    const is_edit = Boolean(listing_id)

    const { showInfoModal } = useModal()
    const { value: image_modal, toggle: toggleImageModal } = useToggle()
    const [create, { isSuccess: is_created, isLoading: is_creating }] = useCreateListingMutation()
    const [update, { isSuccess: is_updated, isLoading: is_updating }] = useUpdateListingMutation()

    const {
        data: listing_response,
        isLoading: listing_loading,
    } = useGetListingByIdQuery(listing_id, { skip: !is_edit })

    const listing = listing_response?.data

    const {
        data: categories_response,
        isLoading: categories_loading,
    } = useGetProductCategoriesQuery()

    const category_options = categories_response?.data ?? []

    const initial = useMemo(() => {

        if (!listing) return empty_initial

        const image_url = listing.image_url || listing.image

        return {
            name: listing.name || "",
            description: listing.description || "",
            category: listing.category?._id
                ? { value: String(listing.category._id), label: listing.category.name }
                : listing.category?.value
                    ? listing.category
                    : null,
            price: listing.price != null ? String(listing.price) : "",
            image: image_url ? { uri: image_url } : null,
        }

    }, [listing])

    const formik = useFormik({
        initialValues: initial,
        enableReinitialize: true,
        validationSchema: create_listing_schema,
        onSubmit: async (values) => {

            const payload_values = {
                name: values.name,
                description: values.description,
                category: values.category?.value,
                price: Number(values.price),
            }

            if (!is_edit || values.image?.type) {
                payload_values.image = values.image
            }

            const payload = convertToFormData(payload_values)

            if (is_edit) update({ id: listing_id, body: payload })
            else create(payload)

        },
    })

    const { openCamera, openGallery } = useImagePicker({
        onImageSelected: (selected) => formik.setFieldValue("image", selected),
    })

    useEffect(() => {
        if (is_created || is_updated) {
            showInfoModal({
                title: "Thank You!",
                message: is_edit
                    ? "Your listing has been updated successfully"
                    : "Your listing has been submitted successfully",
                onConfirm: goBack,
            })
        }
    }, [is_created, is_edit, is_updated])

    return {
        values: {
            formik,
            is_edit,
            is_loading: is_creating || is_updating,
            listing_loading: is_edit && listing_loading,
            image_modal,
            category_options,
            categories_loading,
        },
        functions: {
            toggleImageModal,
            openCamera,
            openGallery,
        },
    }
}

export default useCreateListingController
