import CertCard from "../components/cards/CertCard";
import ProjectCard from "../components/cards/ProjectCard";
import {
    fcc_backend,
    fcc_datavis,
    fcc_frontend,
    fcc_js,
    fcc_webdesign,
    mnfc2,
    port_website,
    cheese,
    events,
    redcoral,
    linklooker,
    dscpreview,
} from "../images";

export default function Projects() {
    return (
        <div className="my-3 grid w-full content-evenly gap-6 pt-3 text-center grid-cols-flow-64">
            <ProjectCard
                name="UW Events listing"
                href="https://uwevents.tsuni.dev"
                imageUrl={events}
                description="My first experience with web scraping. An alternative front-end for the UW-Madison events calendar."
                year="2024"
            />
            <ProjectCard
                name="DSSD Madison - Red CORAL"
                href="https://github.com/DSSD-Madison/Red-CORAL"
                imageUrl={redcoral}
                description="An open-source club project. A web app for a non-profit in South America that visualizes crime data."
                year="2024"
            />
            <ProjectCard
                name="LinkLooker"
                href="https://github.com/TetraTsunami/linklooker"
                imageUrl={linklooker}
                description="My first browser extension. Previews links using ChatGPT when you hover over them in Chrome and Firefox."
                year="2024"
            />
            <ProjectCard
                name="GitHub Discord Previews"
                href="https://github.com/TetraTsunami/discord-github-preview"
                imageUrl={dscpreview}
                description="A project that embeds Discord statuses in SVGs that can be easily placed anywhere."
                year="2024"
            />
            <ProjectCard
                name="The Gouda Times"
                href="https://gouda.tsuni.dev"
                imageUrl={cheese}
                description="A website with cheesey articles based on the New York Times. My project for CheeseHacks 2023, a hackathon hosted by UW-Madison."
                year="2023"
            />
            <CertCard
                name="Back End Development and APIs"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/back-end-development-and-apis"
                imageUrl={fcc_backend}
                year="2023"
            />
            <CertCard
                name="Front End Web Development"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/responsive-web-design"
                collectionUrl="https://codepen.io/collection/rxMyMz"
                imageUrl={fcc_webdesign}
                year="2022"
            />
            <CertCard
                name="JS Algorithms and Data Structures"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/javascript-algorithms-and-data-structures"
                imageUrl={fcc_js}
                year="2022"
            />
            <CertCard
                name="Front End Development Libraries"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/front-end-development-libraries"
                collectionUrl="https://codepen.io/collection/zxdedJ"
                imageUrl={fcc_frontend}
                year="2022"
            />
            <CertCard
                name="Data Visualization"
                certUrl="https://www.freecodecamp.org/certification/Tsuni/data-visualization"
                collectionUrl="https://codepen.io/collection/GoOPLo"
                imageUrl={fcc_datavis}
                year="2022"
            />
            <ProjectCard
                name="Mark Neumann for Congress"
                href="https://web.archive.org/web/20221201032246/http://markneumannforcongress.com/"
                imageUrl={mnfc2}
                description="A Wordpress site for a local political campaign"
                year="2022"
            />
            <ProjectCard
                name="Portfolio Website"
                href="https://github.com/TetraTsunami/website"
                imageUrl={port_website}
                description="The website you're currently on! Built with Next.js, Tailwind CSS, and TypeScript."
                year="2022"
            />
            {/* <ProjectCard
                name="Cricket Bot"
                href="https://github.com/TetraTsunami/cricket-bot"
                imageUrl={cricket_chat}
                description="A fun little Discord bot with a variety of unique functions (such as image manipulation, pinging Minecraft servers, and more)."
                year="2021"
            /> */}
        </div>
    );
}
