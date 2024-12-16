"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import ListSong from "./list-song";
import { ChooseLanguage } from "@/types/types";
import Link from "next/link";

export default function FormRegistration({
  firstName,
  lastName,
  age,
  gender,
  choose,
  flag,
  breadcrumbs,
}: ChooseLanguage) {
  const [selectGender, setSelectGender] = useState<string | null>(null);
  const [completeRegistration, setCompleteRegistration] =
    useState<boolean>(false);

  const inputs = [
    {
      name: "firstName",
      placeHolder: "John",
      label: firstName,
    },
    {
      name: "lastName",
      placeHolder: "Doe",
      label: lastName,
    },
    {
      name: "age",
      placeHolder: "25",
      label: age,
    },
  ];

  return (
    <div className="h-full w-full min-h-screen bg-gray-900">
      <div className="relative container mx-auto w-full flex flex-col items-center justify-center h-full">
        <nav className="absolute top-0 left-0 px-4 py-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className={`${!completeRegistration && "text-pink-600"}`}
                >
                  <Link href={"/"}>{breadcrumbs.register}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {completeRegistration && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink className={`text-pink-600`}>
                      {breadcrumbs.selectSong}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        {completeRegistration ? (
          <ListSong />
        ) : (
          <motion.div
            initial={{
              y: -50,
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
            className="bg-white rounded-xl p-8 shadow-md max-w-lg w-full"
          >
            <div className="aspect-video relative mb-5">
              <Image
                src={`/images/${flag}`}
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCompleteRegistration(true);
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {inputs.map((input) => (
                  <div key={input.name}>
                    <label className="block font-bold text-gray-700 mb-1">
                      {input.label}
                    </label>
                    <input
                      name={input.name}
                      placeholder={input.placeHolder}
                      className="input-field text-gray-50 placeholder-gray-500 w-full bg-gray-900/90 px-3 py-2 rounded-md outline-none focus:outline focus:outline-pink-600 transition-all duration-300 ease-in-out"
                      spellCheck="false"
                      autoComplete="off"
                      maxLength={20}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setSelectGender("male")}
                      type="button"
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all  text-gray-700 ${
                        selectGender === "male"
                          ? "bg-blue-500 text-white"
                          : " hover:bg-blue-500/20 bg-gray-200"
                      }`}
                    >
                      {gender.male}
                    </button>
                    <button
                      onClick={() => setSelectGender("female")}
                      type="button"
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all  text-gray-700 ${
                        selectGender === "female"
                          ? "bg-pink-500 text-white"
                          : " hover:bg-pink-500/20 bg-gray-200"
                      }`}
                    >
                      {gender.female}
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all"
              >
                {choose}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
