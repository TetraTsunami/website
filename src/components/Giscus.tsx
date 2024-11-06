"use client";
import GiscusInner from "@giscus/react";

const Giscus = () => {
  return (
    <>
      <GiscusInner
        id="comments"
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO as any}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID as any}
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        inputPosition="top"
        lang="en"
        loading="lazy"
        theme="dark_dimmed"
      />
    </>
  );
};

export default Giscus;
