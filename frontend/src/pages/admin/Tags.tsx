import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { TagForm } from "../../forms/TagForm";

export function Tags() {
    return (
        <DashboardLayout>
            <section className="container">
                <h2>Tags</h2>  
                <h3 className="text-sm text-wild-text-grey my-3">
                    Ajouter un tag
                </h3>  
            </section> 
            <TagForm/>        
        </DashboardLayout>
    )
}