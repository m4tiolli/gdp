import React from 'react'
import Text from '../primitives/Text'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { IProposals } from '@/interfaces/dashboard_propostas'
import DeleteProposalAlert from '../DeleteProposalAlert'
import { useAuth } from '@/hooks/useAuth'
import { get } from '@/lib/fetchs'

function HomeProposals() {

  const [proposals, setProposals] = React.useState<IProposals[] | never>([])
  const [filteredProposals, setFilteredProposals] = React.useState<IProposals[] | never>([])
  const [searchString, setSearchString] = React.useState("")
  const [cadastroString, setCadastroString] = React.useState("")
  const [responsibleString, setResponsibleString] = React.useState("")
  const { token } = useAuth()
  React.useEffect(() => {
    get("api/proposals/all-proposals", token as string)
      .then((response) => { setProposals(response.data); setFilteredProposals(response.data) })
      .catch((error) => console.error(error))
  }, [token])

  const handleFilter = () => {
    if (searchString === "") {
      setFilteredProposals(proposals);
      return;
    }
    setFilteredProposals(
      proposals.filter((proposal) =>
        proposal.numero_proposta.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  };

  const handleChangeCadastro = (selectedValue: string) => {
    setCadastroString(selectedValue);

    if (selectedValue === "") {
      setFilteredProposals(proposals);
      return;
    }

    setFilteredProposals(
      proposals.filter((proposal) =>
        proposal.elo_proposta.toLowerCase() === selectedValue.toLowerCase()
      )
    );
  };

  const handleFilterResponsible = () => {
    if (responsibleString === "") {
      setFilteredProposals(proposals);
      return;
    }
    setFilteredProposals(
      proposals.filter((proposal) =>
        proposal.nome_usuario.toLowerCase().includes(responsibleString.toLowerCase())
      )
    );
  }

  return (
    <main className='flex flex-col items-start justify-start gap-6'>
      <Text className='font-bold text-4xl text-azul'>Propostas</Text>
      <div className='flex items-center justify-start gap-6 w-full'>
        <div className="flex w-fit items-center space-x-2">
          <Input type="text" placeholder="Pesquisar código da proposta..." value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <Button onClick={handleFilter}>Pesquisar</Button>
        </div>
        <div className="flex w-fit items-center space-x-2">
          <Select onValueChange={(e) => handleChangeCadastro(e)} value={cadastroString}>
            <SelectTrigger className='w-56'>
              <SelectValue placeholder="Selecione o cadastro da Elo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cadastro</SelectLabel>
                <SelectItem value="r">Elo Recuperadora</SelectItem>
                <SelectItem value="s">Elo Serviços</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Input type="text" placeholder="Pesquisar responsável..." value={responsibleString} onChange={(e) => setResponsibleString(e.target.value)} />
          <Button onClick={handleFilterResponsible}>Pesquisar</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Últimas propostas geradas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código da proposta</TableHead>
            <TableHead>Cadastro da Elo</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(filteredProposals).map((proposal, index) => (
            <TableRow key={index}>
              <TableCell>{proposal.numero_proposta}</TableCell>
              <TableCell>{proposal.elo_proposta === "R" ? "Recuperadora" : "Serviços"}</TableCell>
              <TableCell>{proposal.nome_usuario}</TableCell>
              <TableCell><Button onClick={() => window.open(proposal.link_pdf_proposta, '_blank')}>Ver PDF</Button></TableCell>
              <TableCell className='space-x-4'><Button>Criar nova versão</Button><DeleteProposalAlert proposal={proposal} proposals={proposals} setProposals={setFilteredProposals} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </main>
  )
}

export default HomeProposals