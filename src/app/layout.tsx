import MyMenu from "@/components/molecules/my-menu/my-menu";
import "./globals.css";
import MyFooter from "@/components/molecules/my-footer/my-footer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MyMenu />
        <div>{children}</div>
        <MyFooter />
      </body>
    </html>
  );
}