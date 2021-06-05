using Api.Aplicacao;
using System.Collections.Generic;

namespace Api.Services
{
    public interface ICategoriaService
    {
        CategoriaDto ConsultarCategoriaDespesa(int id);
        CategoriaDto ConsultarCategoriaReceita(int id);
        void EditarCategoriaDespesa(CategoriaDto entrada);
        void EditarCategoriaReceita(CategoriaDto entrada);
        void ExcluirCategoriaDespesa(int id);
        void ExcluirCategoriaReceita(int id);
        void InserirCategoriaDespesa(CategoriaDto entrada);
        void InserirCategoriaReceita(CategoriaDto entrada);
        IList<CategoriaDto> ListarCategorias(ListarCategoriasDto entrada);
    }
}