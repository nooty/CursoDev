using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Aplicacao
{
    public class Par {
        public string X { get; set; }
        public decimal Y { get; set; }
    }

    public class GraficoDto
    {
        public List<Par> serieReceita { get; set; } = new List<Par>();
        public List<Par> serieDespesa { get; set; } = new List<Par>();
    }
}
