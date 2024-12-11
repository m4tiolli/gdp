import { StaticImport } from "next/dist/shared/lib/get-img-props";
import home from '../../public/icons/Home.svg'
import novo from '../../public/icons/Criar novo.svg'
import visualizar from '../../public/icons/Visualizar.svg'
import config from '../../public/icons/Configurações.svg'
import admin from '../../public/icons/Painel de admin.svg'

interface IMenuButtons {
  link: string;
  text: string;
  icon: string | StaticImport
}

export const MenuButtons: IMenuButtons[] = [
  {
    link: "/dashboard",
    text: "Home",
    icon: home
  },
  {
    link: "/dashboard/novo",
    text: "Criar novo",
    icon: novo
  },
  {
    link: "/dashboard/visualizar",
    text: "Visualizar",
    icon: visualizar
  },
  {
    link: "/dashboard/configurações",
    text: "Configurações",
    icon: config
  },
  {
    link: "/admin",
    text: "Painel de admin",
    icon: admin
  },
]