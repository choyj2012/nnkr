'use client'

import { Fragment } from "react";
import { useHaiSelectStore } from "@/store/store";

export default function HaiSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  useHaiSelectStore.setState({
    hai: '?'
  })
  
  return (
    <Fragment>
      {children}
    </Fragment>
  )

}