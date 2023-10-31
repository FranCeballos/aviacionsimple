import React, { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetSubjectQuery } from "@/store/services/admin/adminSubjectsApi";
import { motion } from "framer-motion";

import { NotionRenderer } from "react-notion-x";
import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";
import ArrowLeftIcon from "@/components/UI/Icons/ArrowLeftIcon";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";

import "react-notion-x/src/styles.css";
import classes from "./SubjectViewer.module.css";

const SubjectViewer = forwardRef(({ variant }, ref) => {
  const {
    query: { materia: subjectId },
  } = useRouter();
  const { data, isLoading } = useGetSubjectQuery({ subjectId });

  return (
    <motion.div
      key="viewer"
      variants={variant}
      initial="hide"
      animate="show"
      exit="exit"
      className={classes.container}
    >
      {isLoading ? (
        <TripleSpinner />
      ) : (
        <>
          <div className={classes["action__container"]}>
            <Link
              href="/academia/iv-brigada-aerea/plataforma"
              className={classes["back-button"]}
            >
              <ScaleOnHover>
                <ArrowLeftIcon />
              </ScaleOnHover>
            </Link>
          </div>
          {data ? (
            <NotionRenderer recordMap={data?.recordMap} fullPage={true} />
          ) : (
            <p className={classes["not-found__text"]}>
              La materia seleccionada no existe.
            </p>
          )}
        </>
      )}
    </motion.div>
  );
});

export default SubjectViewer;
