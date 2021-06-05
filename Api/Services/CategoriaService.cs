using Api.Aplicacao;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public class CategoriaService : ICategoriaService
    {
        private DbContext _cx;

        public CategoriaService(DbContext cx)
        {
            _cx = cx;
        }

        public IList<CategoriaDto> ListarCategorias(ListarCategoriasDto entrada)
        {
            if (entrada.Tipo == "Receita")
            {
                return _cx.CategoriaReceita
                    .OrderBy(x => x.Descricao)
                    .Select(x => new CategoriaDto()
                    {
                        Id = x.Id,
                        Descricao = x.Descricao,
                        Tipo = "Receita"
                    }).ToList();
            }
            else if (entrada.Tipo == "Despesa")
            {
                return _cx.CategoriaDespesas
                    .OrderBy(x => x.Descricao)
                    .Select(x => new CategoriaDto()
                    {
                        Id = x.Id,
                        Descricao = x.Descricao,
                        Tipo = "Despesa"
                    }).ToList();
            }

            return _cx.CategoriaReceita
                    .OrderBy(x => x.Descricao).Select(x => new CategoriaDto()
                    {
                        Id = x.Id,
                        Descricao = x.Descricao,
                        Tipo = "Receita"
                    }).Union(_cx.CategoriaDespesas
                    .OrderBy(x => x.Descricao)
                    .Select(x => new CategoriaDto()
                    {
                        Id = x.Id,
                        Descricao = x.Descricao,
                        Tipo = "Despesa"
                    })).ToList();
        }

        public void InserirCategoriaDespesa(CategoriaDto entrada)
        {
            CategoriaDespesa r = new CategoriaDespesa();
            r.Descricao = entrada.Descricao;

            _cx.Add(r);

            _cx.SaveChanges();
        }

        public void InserirCategoriaReceita(CategoriaDto entrada)
        {
            CategoriaReceita r = new CategoriaReceita();
            r.Descricao = entrada.Descricao;

            _cx.Add(r);

            _cx.SaveChanges();
        }

        public void EditarCategoriaDespesa(CategoriaDto entrada)
        {
            var r = _cx.CategoriaDespesas.Where(x => x.Id == entrada.Id).Single();

            r.Descricao = entrada.Descricao;

            _cx.SaveChanges();
        }

        public void EditarCategoriaReceita(CategoriaDto entrada)
        {
            var r = _cx.CategoriaReceita.Where(x => x.Id == entrada.Id).Single();

            r.Descricao = entrada.Descricao;

            _cx.SaveChanges();
        }

        public void ExcluirCategoriaDespesa(int id)
        {
            var r = _cx.CategoriaDespesas.Where(x => x.Id == id).Single();

            _cx.Remove(r);

            _cx.SaveChanges();
        }

        public void ExcluirCategoriaReceita(int id)
        {
            var r = _cx.CategoriaReceita.Where(x => x.Id == id).Single();

            _cx.Remove(r);

            _cx.SaveChanges();
        }

        public CategoriaDto ConsultarCategoriaDespesa(int id)
        {
            return _cx.CategoriaReceita.Where(x => x.Id == id)
                .Select(x => new CategoriaDto()
                {
                    Id = x.Id,
                    Descricao = x.Descricao,
                    Tipo = "Despesa"
                }).Single();
        }

        public CategoriaDto ConsultarCategoriaReceita(int id)
        {
            return _cx.CategoriaReceita.Where(x => x.Id == id)
                .Select(x => new CategoriaDto()
                {
                    Id = x.Id,
                    Descricao = x.Descricao,
                    Tipo = "Receita"
                }).Single();
        }
    }
}
