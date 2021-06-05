using Api.Aplicacao;
using System.Collections.Generic;

namespace Api.Services
{
    public interface IMovimentoService
    {
        MovimentoDto ConsultarMovimento(int id);
        void EditarMovimento(MovimentoDto entrada);
        void ExcluirMovimento(int id);
        void InserirMovimento(MovimentoDto entrada);
        IList<MovimentoDto> ListarMovimentos(ListarMovimentosDto entrada);
        public GraficoDto ConsultarGrafico();

    }
}