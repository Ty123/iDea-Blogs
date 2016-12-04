using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using iDea.Domains.Contracts;
using iDea.Domains.Entities;
using iDea.DAL.Models;
using System.Text.RegularExpressions;

namespace iDea.DAL.Controllers
{
    [Authorize]
    [RoutePrefix("api/Categories")]
    public class CategoriesController : ApiController
    {
        private readonly IUnitOfWork _uow;

        public CategoriesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        /// <summary>
        /// List of categories
        /// </summary>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var entities = _uow.CategoryRepository.GetAll();

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = new List<CategoryDetail>();

            foreach (var entity in entities)
            {
                if (entity != null)
                {
                    var posts = entity.Posts.Select(p => new PostDetail
                    {
                        Id = p.Id,
                        Title = p.Title,
                        ShortDescription = p.ShortDescription,
                        UrlSlug = p.UrlSlug
                    }).ToList();

                    models.Add(new CategoryDetail
                    {
                        Id = entity.Id,
                        Name = entity.Name,
                        Description = entity.Description,
                        Posts = posts,
                        UrlSlug = entity.UrlSlug
                    });
                }
            }

            return Ok(models);
        }

        /// <summary>
        /// Search a category by email
        /// </summary>
        [HttpGet]
        [Route("Search")]
        public IHttpActionResult Search(string name = "")
        {
            if (String.IsNullOrEmpty(name))
            {
                return BadRequest();
            }

            var n = Regex.Replace(name, "_", " ");

            var entities = _uow.CategoryRepository.Get(c => c.Name == n).ToList();

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = new List<CategoryDetail>();

            foreach (var entity in entities)
            {
                if (entity != null)
                {
                    var posts = entity.Posts.Select(p => new PostDetail
                    {
                        Id = p.Id,
                        Title = p.Title,
                        ShortDescription = p.ShortDescription,
                        UrlSlug = p.UrlSlug
                    }).ToList();

                    models.Add(new CategoryDetail
                    {
                        Id = entity.Id,
                        Name = entity.Name,
                        Description = entity.Description,
                        Posts = posts,
                        UrlSlug = entity.UrlSlug
                    });
                }
            }

            return Ok(models);
        }
        
        /// <summary>
        /// Search a category by id
        /// </summary>
        [HttpGet]
        [Route("Search/{id:int}")]
        public IHttpActionResult Search(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var entity = _uow.CategoryRepository.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            var posts = entity.Posts.Select(p => new PostDetail
            {
                Id = p.Id,
                Title = p.Title,
                ShortDescription = p.ShortDescription,
                UrlSlug = p.UrlSlug
            }).ToList();

            return Ok(new CategoryDetail
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Posts = posts,
                UrlSlug = entity.UrlSlug
            });
        }

        /// <summary>
        /// Delete a category
        /// </summary>
        [HttpDelete]
        [Route("Delete/{id:int}")]
        public IHttpActionResult Delete(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var entity = _uow.CategoryRepository.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            _uow.CategoryRepository.Delete(entity);
            _uow.Save();

            return Ok();
        }

        /// <summary>
        /// A category details
        /// </summary>
        [HttpGet]
        [Route("Details/{id:int}")]
        public IHttpActionResult Details(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var entity = _uow.CategoryRepository.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            var posts = entity.Posts.Select(p => new PostDetail
            {
                Id = p.Id,
                Title = p.Title,
                ShortDescription = p.ShortDescription,
                UrlSlug = p.UrlSlug
            }).ToList();

            return Ok(new CategoryDetail
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Posts = posts,
                UrlSlug = entity.UrlSlug
            });
        }

        /// <summary>
        /// Edit Category
        /// </summary>
        [HttpPost]
        [Route("Edit")]
        public IHttpActionResult Edit(CategoryModel model)
        {
            if (ModelState.IsValid)
            {
                var urlSlug = "/Categories/Search?name=" + Regex.Replace(model.Name, " ", "_");
                var entity = _uow.CategoryRepository.FindById(model.Id);

                if (entity == null)
                {
                    return NotFound();
                }

                entity.Name = model.Name;
                entity.UrlSlug = urlSlug;
                entity.Description = model.Description;

                _uow.CategoryRepository.Edit(entity);
                _uow.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Add New Category
        /// </summary>
        [HttpPost]
        [Route("Add")]
        public IHttpActionResult Add(CategoryModel model)
        {
            if (ModelState.IsValid)
            {
                var urlSlug = "/Categories/Search?name=" +  Regex.Replace(model.Name, " ", "_");
                _uow.CategoryRepository.Add(new Category(model.Name, urlSlug, model.Description));
                _uow.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }

    }
}
