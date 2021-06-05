using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Aplicacao
{
    public class MovimentoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public decimal Valor { get; set; }

        public string CategoriaTipo { get; set; }
        public string CategoriaDescricao { get; set; }
        public int CategoriaId { get; set; }

    }
}
