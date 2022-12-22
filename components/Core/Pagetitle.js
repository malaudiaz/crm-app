import Link from "next/link";
import { useRouter } from 'next/router';

export default function PageTitle({title, except=""}) {
    const router = useRouter();

    // Each individual "crumb" in the breadcrumbs list
    function Crumb({ text, href, last=false }) {
        // The last crumb is rendered as normal text since we are already on the page
        if (last || text == except) {
            return <li className="breadcrumb-item active">{text}</li>
        }
    
        // All other crumbs will be rendered as links that can be visited 
        return (
            <li className="breadcrumb-item">
                <Link href={href}>
                    <a>{text}</a>
                </Link>
            </li>
        );
    }    

    function generateBreadcrumbs() {
        const asPathWithoutQuery = router.asPath.split("?")[0];
        const asPathNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0);
   
        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            let text = "";
            switch (subpath) {
                case "users":
                    text = "Usuarios";
                    break;
                case "contacts":
                    text = "Contáctos";
                    break;
                case "partner":
                    text = "Clientes";
                    break;
                case "list":
                    text = "Listado";
                    break;
                case "profile":
                    text = "Pérfil";
                    break;
                case "contracts":
                    text = "Contratos";
                    break;
                default:
                    text = subpath;
                    break;
            }
            return { href, text: text }; 
        })
    
        return [{ href: "/", text: "Tablero" }, ...crumblist];
    }
    
      // Call the function to generate the breadcrumbs list
    const breadcrumbs = generateBreadcrumbs();

    return (
        <div className="pagetitle">
            <h1>{title}</h1>
            <nav>
                <ol className="breadcrumb">
                    {
                        breadcrumbs.map( (crumb, idx) => {
                            return ( <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} /> )
                        })
                    }
                </ol>
            </nav>
        </div>
    )
}
