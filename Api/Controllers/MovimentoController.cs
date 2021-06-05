using Api.Aplicacao;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/movimentos")]
    public class MovimentoController : ControllerBase
    {
        private IMovimentoService _servico;

        public MovimentoController(IMovimentoService servico)
        {
            _servico = servico;
        }

        [HttpPost]
        public IActionResult Inserir(MovimentoDto entrada)
        {
            _servico.InserirMovimento(entrada);

            return Ok();
        }

        [HttpPut]
        public IActionResult Editar(MovimentoDto entrada)
        {
            _servico.EditarMovimento(entrada);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Excluir(int id)
        {
            _servico.ExcluirMovimento(id);

            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult Consultar(int id)
        {
            var r = _servico.ConsultarMovimento(id);

            return Ok(r);
        }

        [HttpGet]
        public IActionResult Listar([FromQuery] ListarMovimentosDto entrada)
        {
            var r = _servico.ListarMovimentos(entrada);

            return Ok(r);
        }

        [HttpGet("grafico")]
        public IActionResult ConsultarGrafico()
        {
            var r = _servico.ConsultarGrafico();

            return Ok(r);
        }
    }
}
