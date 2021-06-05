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
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        private ICategoriaService _servico;

        public CategoriaController(ICategoriaService servico)
        {
            _servico = servico;
        }

        [HttpPost("despesas")]
        public IActionResult InserirDespesa(CategoriaDto entrada)
        {
            _servico.InserirCategoriaDespesa(entrada);
            return Ok();
        }

        [HttpPost("receitas")] 
        public IActionResult InserirReceita(CategoriaDto entrada)
        {
            _servico.InserirCategoriaReceita(entrada);
            return Ok();
        }

        [HttpPut("despesas")]
        public IActionResult EditarDespesa(CategoriaDto entrada)
        {
            _servico.EditarCategoriaDespesa(entrada);
            return Ok();
        }

        [HttpPut("receitas")]
        public IActionResult EditarReceita(CategoriaDto entrada)
        {
            _servico.EditarCategoriaReceita(entrada);
            return Ok();
        }

        [HttpDelete("despesas/{id}")]
        public IActionResult ExcluirDespesa(int id)
        {
            _servico.ExcluirCategoriaDespesa(id);
            return Ok();
        }

        [HttpDelete("receitas/{id}")]
        public IActionResult ExcluirReceita(int id)
        {
            _servico.ExcluirCategoriaReceita(id);
            return Ok();
        }

        [HttpGet("despesas/{id}")]
        public IActionResult ConsultarDespesa(int id)
        {
            var r = _servico.ConsultarCategoriaDespesa(id);
            return Ok(r);
        }

        [HttpGet("receitas/{id}")]
        public IActionResult ConsultarReceita(int id)
        {
            var r = _servico.ConsultarCategoriaReceita(id);
            return Ok(r);
        }

        [HttpGet()]
        public IActionResult ListarCategorias([FromQuery] ListarCategoriasDto entrada)
        {
            var r = _servico.ListarCategorias(entrada);
            return Ok(r);
        }

    }
}
