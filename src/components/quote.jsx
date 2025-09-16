import { motion } from "framer-motion"
export const Quote = () => {
    return (
        <motion.div className="bg-black/90 h-[30vh]">
            <div className="max-w-6xl pt-9 pl-6 pr-4 h-full flex flex-col items-start text-white text-center gap-4">
                <h2 className="font-laLuxes text-4xl">
                    Retrospective: Shakespeare in the Park
                </h2>
                <p className="text-md text-white/80 text-regular font-[100] text-left">
                    In 1954, impresario Joe Papp began a summer tradition of staging free outdoor performances of Shakespeare, inaugurating the Public Theater’s beloved Shakespeare in the Park festival. Pentagram partner Paula Scher, whose relationship with the Public spans four decades, has designed a new identity for the series for thirty consecutive summers. Each campaign is customized to the season’s theme, creating a highly visible graphic vocabulary for outdoor advertising, social media, and on-site signage.
                </p>
            </div>
        </motion.div>
    )
}