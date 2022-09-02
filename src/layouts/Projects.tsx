import CertCard from "../components/cards/CertCard";
import ProjectCard from "../components/cards/ProjectCard";
import GridDivider from "../components/util/GridDivider";
import { fcc_frontend, fcc_js, fcc_webdesign, mnfc2 } from "../images";

export default function Projects() {
    return (
        <div className="grid gap-3 pt-3 mt-3 text-center grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full">
            <GridDivider name="Websites" />
            <ProjectCard
                name="Mark Neumann for Congress"
                href="https://markneumannforcongress.com/"
                imageUrl={mnfc2}
                description="A Wordpress site for a local political campaign"
                year="2022"
            />
            <GridDivider name="FreeCodeCamp Certificates" />
            <CertCard
                name="Front End Web Development"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/responsive-web-design"
                collectionUrl="https://codepen.io/collection/rxMyMz"
                imageUrl={fcc_frontend}
            />
            <CertCard
                name="JavaScript Algorithms and Data Structures"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/javascript-algorithms-and-data-structures"
                imageUrl={fcc_js}
            />
            <CertCard
                name="Front End Development Libraries"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/front-end-development-libraries"
                collectionUrl="https://codepen.io/collection/zxdedJ"
                imageUrl={fcc_webdesign}
            />
        </div>
    );
}
