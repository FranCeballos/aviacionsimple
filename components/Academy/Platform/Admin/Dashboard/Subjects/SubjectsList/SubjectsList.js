import React from "react";
import classes from "./SubjectsList.module.css";
import { useGetAllSubjectsTitlesQuery } from "@/store/services/subjectsApi";
import TripleSpinner from "@/components/UI/AnimatedComponents/loaders/TripleSpinner";
import SubjectItem from "./SubjectItem";

const SubjectsList = (props) => {
  const { data, isLoading } = useGetAllSubjectsTitlesQuery();
  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes["loader__container"]}>
          <TripleSpinner />
        </div>
      ) : (
        data.subjects.map((i) => (
          <SubjectItem
            key={i.customId}
            title={i.title}
            link={`/academia/iv-brigada-aerea/admin?vista=materias&materia=${i.customId}`}
          />
        ))
      )}
    </div>
  );
};

export default SubjectsList;
