using System;
using System.Collections.Generic;

#nullable disable

namespace Api.Models
{
    public partial class CategoriaReceita
    {
        public CategoriaReceita()
        {
            Movimentos = new HashSet<Movimento>();
        }

        public int Id { get; set; }
        public string Descricao { get; set; }

        public virtual ICollection<Movimento> Movimentos { get; set; }
    }
}
