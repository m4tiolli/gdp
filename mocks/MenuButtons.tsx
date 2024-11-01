import { ReactElement } from "react";
import { GoHome } from "react-icons/go";
import { BiSpreadsheet } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";

interface IMenuButtons {
  link: string;
  text: string;
  icon: ReactElement
}

export const MenuButtons: IMenuButtons[] = [
  {
    link: "/dashboard",
    text: "Home",
    icon: <GoHome className="text-4xl" />
  },
  {
    link: "/dashboard/novo",
    text: "Criar novo",
    icon: <LuPlusCircle className="text-4xl" />
  },
  {
    link: "/dashboard/visualizar",
    text: "Visualizar",
    icon: <BiSpreadsheet className="text-4xl" />
  },
  {
    link: "/dashboard/configurações",
    text: "Configurações",
    icon: <IoSettingsOutline className="text-4xl" />
  },
  {
    link: "/admin",
    text: "Painel de admin",
    icon: <MdLockOutline className="text-4xl" />
  },
]