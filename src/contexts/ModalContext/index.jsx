import { createContext, useContext, useRef, useState } from "react"
import GlobalModal from "../../components/GlobalModal"

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {

    const [modal, setModal] = useState({ visible: false, type: "info", title: "", message: "", button_text: "Ok" })

    const resolve_ref = useRef(null)
    const ok_callback_ref = useRef(null)

    const showInfoModal = ({ title, message, button_text, onConfirm }) => {
        ok_callback_ref.current = onConfirm ?? null
        setModal({ visible: true, type: "info", title, message, button_text })
    }

    const showConfirmModal = ({ title, message }) => {
        return new Promise((resolve) => {
            resolve_ref.current = resolve
            setModal({ visible: true, type: "confirm", title, message })
        })
    }

    const handleOk = () => {
        setModal((prev) => ({ ...prev, visible: false }))
        ok_callback_ref.current?.()
        ok_callback_ref.current = null
    }

    const handleYes = () => {
        setModal((prev) => ({ ...prev, visible: false }))
        resolve_ref.current?.(true)
    }

    const handleNo = () => {
        setModal((prev) => ({ ...prev, visible: false }))
        resolve_ref.current?.(false)
    }

    return (
        <ModalContext.Provider value={{ showInfoModal, showConfirmModal }}>
            {children}
            <GlobalModal
                visible={modal.visible}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                button_text={modal.button_text}
                onOk={handleOk}
                onYes={handleYes}
                onNo={handleNo}
            />
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)