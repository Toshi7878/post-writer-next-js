"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Callout from "./Callout"; // Calloutのインポートを確認

const components = {
  Image,
  Callout, // Calloutをcomponentsオブジェクトに追加
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose max-w-full">
      <Component components={components} />{" "}
      {/* "components" のスペルミスを修正 */}
    </div>
  );
}
