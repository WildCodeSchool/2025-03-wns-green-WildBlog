import type { IconType } from "react-icons";


interface ButtonProps {
    type?: "button" | "submit" | "reset"; 
    label: string,
    icon?: IconType; 
    onClick? : () => void
    className?: string
    disabled?: boolean
}

export function Button({  type = "button", label, icon: Icon, onClick, className='bg-wild-text-grey', disabled }: ButtonProps ) {
    return (
    <button 
        type={type}  
        className={`btn-dashboard ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}  
        onClick={onClick}
        disabled={disabled}
        >
        <span className="btn-text">{label}</span>
        {Icon && (
            <span className="btn-icon">
                <Icon className="w-5 h-5" />
            </span>
        )}    
    </button>
    );
}

