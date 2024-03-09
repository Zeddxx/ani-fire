import { FaSpinner } from "react-icons/fa"

export const UserLoading = () => {
    return (
        <div className="">
            <span>
                <FaSpinner className="animate-spin h-5 w-5 text-primary" />
            </span>
        </div>
    )
}