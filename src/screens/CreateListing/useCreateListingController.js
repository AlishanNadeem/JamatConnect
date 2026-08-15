import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import { useModal } from "../../contexts/ModalContext"
import { convertToFormData } from "../../helpers/general"
import { goBack } from "../../helpers/navigation"
import useImagePicker from "../../hooks/useImagePicker"
import useToggle from "../../hooks/useToggle"
import { useCreateListingMutation } from "../../redux/apis/Marketplace"
import { useGetProductCategoriesQuery } from "../../redux/apis/ProductCategory"

const file_schema = Yup.mixed()
    .required("Image is required")
    .test("file", "Please upload an image", (value) => Boolean(value?.uri))

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
        id: Yup.string().required("Category is required"),
        name: Yup.string(),
    }).nullable().required("Category is required"),
    price: Yup.number()
        .transform((value, original) => (original === "" || original === null ? undefined : Number(original)))
        .typeError("Enter a valid price")
        .min(0, "Price cannot be negative")
        .required("Price is required"),
})

const useCreateListingController = () => {

    const { showInfoModal } = useModal()
    const { value: image_modal, toggle: toggleImageModal } = useToggle()
    const [submit, { isSuccess, isLoading }] = useCreateListingMutation()

    const {
        data: categories_response,
        isLoading: categories_loading,
    } = useGetProductCategoriesQuery()

    const categories = categories_response?.data ?? []

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            category: null,
            price: "",
            image: null,
        },
        validationSchema: create_listing_schema,
        onSubmit: async (values) => {

            const payload = convertToFormData({
                name: values.name,
                description: values.description,
                category: values.category?.id,
                price: Number(values.price),
                image: values.image,
            })

            submit(payload)

        },
    })

    const { openCamera, openGallery } = useImagePicker({
        onImageSelected: (selected) => formik.setFieldValue("image", selected),
    })

    useEffect(() => {
        if (isSuccess) {
            showInfoModal({
                title: "Thank You!",
                message: "Your listing has been submitted successfully",
                onConfirm: goBack,
            })
        }
    }, [isSuccess])

    return {
        values: {
            formik,
            is_loading: isLoading,
            image_modal,
            categories,
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
