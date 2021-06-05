using System;
using System.Collections.Generic;

#nullable disable

namespace Api.Models
{
    public partial class Movimento
    {
        public int Id { get; set; }
        public int? CategoriaReceitaId { get; set; }
        public int? CategoriaDespesaId { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public decimal Valor { get; set; }

        public virtual CategoriaDespesa CategoriaDespesa { get; set; }
        public virtual CategoriaReceita CategoriaReceita { get; set; }
    }
}
