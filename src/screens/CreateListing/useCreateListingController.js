import { useRoute } from "@react-navigation/native"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { appendFormDataValue, convertToFormData } from "../../helpers/general"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"
import {
    useCreateListingMutation,
    useGetListingByIdQuery,
    useUpdateListingMutation,
} from "../../redux/apis/Marketplace"
import { useGetProductCategoriesQuery } from "../../redux/apis/ProductCategory"

export const MAX_LISTING_IMAGES = 10

// Each photo is either a new pick ({ uri, type, name }) or one already saved ({ uri, path }).
const images_schema = Yup.array()
    .of(Yup.object({ uri: Yup.string().required() }))
    .min(1, "Add at least one photo")
    .max(MAX_LISTING_IMAGES, `You can add up to ${MAX_LISTING_IMAGES} photos`)

const create_listing_schema = Yup.object({
    images: images_schema,
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
    images: [],
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

        // Older listings have only `image`; newer ones have `images` with matching `image_urls`.
        const paths = listing.images?.length ? listing.images : [listing.image].filter(Boolean)
        const urls = listing.image_urls?.length ? listing.image_urls : [listing.image_url].filter(Boolean)
        const images = paths
            .map((path, index) => ({ path, uri: urls[index] }))
            .filter((image) => image.uri)

        return {
            name: listing.name || "",
            description: listing.description || "",
            category: listing.category?._id
                ? { value: String(listing.category._id), label: listing.category.name }
                : listing.category?.value
                    ? listing.category
                    : null,
            price: listing.price != null ? String(listing.price) : "",
            images,
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

            const payload = convertToFormData(payload_values)

            // New photos are uploaded as `images`; on edit, `kept_images` lists the saved ones to keep.
            values.images
                .filter((image) => !image.path)
                .forEach((image) => appendFormDataValue(payload, "images", image))

            if (is_edit) {
                const kept = values.images.filter((image) => image.path).map((image) => image.path)
                payload.append("kept_images", JSON.stringify(kept))
            }

            if (is_edit) update({ id: listing_id, body: payload })
            else create(payload)

        },
    })

    const remaining_slots = Math.max(0, MAX_LISTING_IMAGES - formik.values.images.length)

    const { openCamera, openGallery } = useImagePicker({
        selection_limit: Math.max(remaining_slots, 2),
        onImageSelected: (selected) => {
            const picked = (Array.isArray(selected) ? selected : [selected]).filter(Boolean)
            const next = [...formik.values.images, ...picked].slice(0, MAX_LISTING_IMAGES)
            formik.setFieldValue("images", next)
            formik.setFieldTouched("images", true, false)
        },
    })

    const onRemoveImage = (index) => {
        formik.setFieldValue("images", formik.values.images.filter((_, i) => i !== index))
        formik.setFieldTouched("images", true, false)
    }

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
            max_images: MAX_LISTING_IMAGES,
        },
        functions: {
            onRemoveImage,
            toggleImageModal,
            openCamera,
            openGallery,
        },
    }
}

export default useCreateListingController
