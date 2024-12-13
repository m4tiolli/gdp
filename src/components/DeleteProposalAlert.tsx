import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { IProposals } from '@/interfaces/dashboard_propostas';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

function DeleteProposalAlert({ proposal, proposals, setProposals }: { proposal: IProposals, proposals: IProposals[], setProposals: React.Dispatch<React.SetStateAction<IProposals[]>> }) {
  const { toast } = useToast();

  const handleDeleteProposal = async () => {
    try {
      const body = { code: proposal.numeroProposta, table: proposal.nomeTabela };
      const response = await axios.delete("/api/proposals", { data: body });

      if (response.status === 200) {
        setProposals(proposals.filter((prop) => prop.numeroProposta !== proposal.numeroProposta))
        toast({
          title: "Sucesso",
          description: "Proposta deletada com sucesso!",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar deletar a proposta.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Excluir</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Você irá excluir a proposta {proposal.numeroProposta} de nossa base de dados para sempre.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProposal}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProposalAlert;
