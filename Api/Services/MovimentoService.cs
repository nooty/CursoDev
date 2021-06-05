using Api.Aplicacao;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public class MovimentoService : IMovimentoService
    {
        private DbContext _cx;

        public MovimentoService(DbContext cx)
        {
            _cx = cx;
        }

        public void InserirMovimento(MovimentoDto entrada)
        {
            Movimento m = new Movimento();

            if (entrada.CategoriaTipo == "Despesa")
            {
                m.CategoriaDespesaId = entrada.CategoriaId;
                m.Descricao = entrada.Descricao;
                m.Valor = entrada.Valor;
                m.Data = entrada.Data;
            }
            else
            {
                m.CategoriaReceitaId = entrada.CategoriaId;
                m.Descricao = entrada.Descricao;
                m.Valor = entrada.Valor;
                m.Data = entrada.Data;
            }

            _cx.Add(m);
            _cx.SaveChanges();
        }

        public void EditarMovimento(MovimentoDto entrada)
        {
            Movimento m = _cx.Movimentos.Where(x => x.Id == entrada.Id).Single();

            if (entrada.CategoriaTipo == "Despesa")
            {
                m.CategoriaDespesaId = entrada.CategoriaId;
                m.Descricao = entrada.Descricao;
                m.Valor = entrada.Valor;
                m.Data = entrada.Data;
            }
            else
            {
                m.CategoriaReceitaId = entrada.CategoriaId;
                m.Descricao = entrada.Descricao;
                m.Valor = entrada.Valor;
                m.Data = entrada.Data;
            }

            _cx.SaveChanges();
        }

        public void ExcluirMovimento(int id)
        {
            var movimento = _cx.Movimentos.Single(x => x.Id == id);

            _cx.Remove(movimento);

            _cx.SaveChanges();
        }

        public IList<MovimentoDto> ListarMovimentos(ListarMovimentosDto entrada)
        {
            return _cx.Movimentos
                .Where(x => x.Data.Date >= entrada.DataInicial && x.Data <= entrada.DataFinal.Date)
                .OrderByDescending(x => x.Data)
                .Select(x => new MovimentoDto()
                {
                    CategoriaDescricao = x.CategoriaReceitaId != null ?
                        x.CategoriaReceita.Descricao : x.CategoriaDespesa.Descricao,
                    CategoriaId = x.CategoriaReceitaId != null ?
                        x.CategoriaReceita.Id : x.CategoriaDespesa.Id,
                    CategoriaTipo = x.CategoriaReceitaId != null ?
                        "Receita" : "Despesa",
                    Data = x.Data,
                    Id = x.Id,
                    Descricao = x.Descricao,
                    Valor = x.Valor
                })
                .ToList();
        }

        public MovimentoDto ConsultarMovimento(int id)
        {
            return _cx.Movimentos
                .Where(x => x.Id == id)
                .OrderByDescending(x => x.Data)
                .Select(x => new MovimentoDto()
                {
                    CategoriaDescricao = x.CategoriaReceitaId != null ?
                        x.CategoriaReceita.Descricao : x.CategoriaDespesa.Descricao,
                    CategoriaId = x.CategoriaReceitaId != null ?
                        x.CategoriaReceita.Id : x.CategoriaDespesa.Id,
                    CategoriaTipo = x.CategoriaReceitaId != null ?
                        "Receita" : "Despesa",
                    Data = x.Data,
                    Id = x.Id,
                    Descricao = x.Descricao,
                    Valor = x.Valor
                })
                .Single();
        }

        public GraficoDto ConsultarGrafico()
        {
            var dInicial = DateTime.Today.AddMonths(-4);
            
            var serieReceita = _cx.Movimentos
                .Where(x => x.Data >= dInicial && x.CategoriaDespesaId == null)
                .OrderBy(x => x.Data)
                .GroupBy(x => new { x.Data.Month, x.Data.Year })
                .Select(x => new Par()
                {
                    Y = x.Sum(z => z.Valor),
                    X = x.Key.Month + "/" + x.Key.Year,
                })
                .ToList();

            var serieDespesa = _cx.Movimentos
                .Where(x => x.Data >= dInicial && x.CategoriaDespesaId != null)
                .OrderBy(x => x.Data)
                .GroupBy(x => new { x.Data.Month, x.Data.Year })
                .Select(x => new Par()
                {
                    Y = x.Sum(z => z.Valor),
                    X = x.Key.Month + "/" + x.Key.Year,
                })
                .ToList();

            return new GraficoDto()
            {
                serieReceita = serieReceita,
                serieDespesa = serieDespesa,
            };
        }
    }
}
