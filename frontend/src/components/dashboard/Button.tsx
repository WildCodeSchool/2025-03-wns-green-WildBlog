import type { IconType } from "react-icons";


interface ButtonProps {
    label: string,
    icon?: IconType; 
    onClick? : () => void
}

export function Button({ label, icon: Icon, onClick }: ButtonProps ) {
    return (
    <button className="btn-dashboard" onClick={onClick}>
        <span className="btn-text">{label}</span>
        {Icon && (
            <span className="btn-icon">
                <Icon className="w-5 h-5" />
            </span>
        )}    
    </button>
    );
}

