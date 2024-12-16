import { motion } from "motion/react";
import Image from "next/image";

interface ChooseLanguageProps {
  handleSetLanguage: (lang: string) => void;
}

export default function ChooseLanguage({
  handleSetLanguage,
}: ChooseLanguageProps) {
  const flags = [
    {
      flag: "/images/france.svg",
      language: "French",
      text: "Vous parlez français",
      code: "fr",
    },
    {
      flag: "/images/english.svg",
      language: "English",
      text: "You speak English",
      code: "en",
    },
  ];

  return (
    <>
      {flags.map((flag, i) => (
        <motion.div
          onClick={() => handleSetLanguage(flag.code)}
          initial={{
            y: i === 0 ? -50 : i === 1 ? 50 : 0,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.95 }}
          role="button"
          className="max-w-lg w-full hover:scale-105 transition-colors hover:bg-black/10 rounded-2xl pb-2"
          key={i}
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={flag.flag}
              fill
              alt={flag.language}
              className="object-cover"
            />
          </div>
          <p className="text-center mt-4 font-bold text-lg">{flag.text}</p>
        </motion.div>
      ))}
    </>
  );
}
