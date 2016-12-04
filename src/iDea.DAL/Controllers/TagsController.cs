using iDea.DAL.Models;
using iDea.Domains.Contracts;
using iDea.Domains.Entities;
using iDea.Domains.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text.RegularExpressions;

namespace iDea.DAL.Controllers
{
    [Authorize]
    [RoutePrefix("api/Tags")]
    public class TagsController : ApiController
    {

        private readonly IUnitOfWork _uow;

        public TagsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        /// <summary>
        /// Tags order by query
        /// </summary>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var entities = _uow.TagRepository.GetAll();

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = new List<TagDetail>();

            foreach (var entity in entities)
            {
                if (entity != null)
                {
                    var posts = entity.Posts.Select(p => new PostDetail { 
                        Id = p.Id,
                        Title = p.Title,
                        ShortDescription = p.ShortDescription
                    }).ToList();


                    models.Add(new TagDetail
                    {
                        Id = entity.Id,
                        Name = entity.Name,
                        Description = entity.Description,
                        UrlSlug = entity.UrlSlug,
                        Posts = posts
                    });
                }
            }

            return Ok(models);
        }

        /// <summary>
        /// Search email and orderby
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

            var entities = _uow.TagRepository.Get(t => t.Name == n);

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = new List<TagDetail>();

            foreach (var entity in entities)
            {
                if (entity != null)
                {
                    var posts = entity.Posts.Select(p => new PostDetail
                    {
                        Id = p.Id,
                        Title = p.Title,
                        ShortDescription = p.ShortDescription
                    }).ToList();

                    var urlSlug = String.Format(Constants.urlSlugFormat, "Tags", entity.Name);
                    models.Add(new TagDetail
                    {
                        Id = entity.Id,
                        Name = entity.Name,
                        Description = entity.Description,
                        UrlSlug = urlSlug,
                        Posts = posts
                    });
                }
            }

            return Ok(models);
        }

        /// <summary>
        /// Delete a tag
        /// </summary>
        [HttpDelete]
        [Route("Delete/{id:int}")]
        public IHttpActionResult Delete(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var entity = _uow.TagRepository.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            _uow.TagRepository.Delete(entity);
            _uow.Save();

            return Ok();
        }

        /// <summary>
        /// Tag details
        /// </summary>
        [HttpGet]
        [Route("Details/{id:int}")]
        public IHttpActionResult Details(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var entity = _uow.TagRepository.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            var posts = entity.Posts.Select(p => new PostDetail
            {
                Id = p.Id,
                Title = p.Title,
                ShortDescription = p.ShortDescription
            }).ToList();

            return Ok(new TagDetail
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                UrlSlug = entity.UrlSlug,
                Posts = posts
            });
        }

        /// <summary>
        /// Edit the tag
        /// </summary>
        [HttpPost]
        [Route("Edit")]
        public IHttpActionResult Edit(TagModel model)
        {
            if (ModelState.IsValid)
            {
                var entity = _uow.TagRepository.FindById(model.Id);

                if (entity == null)
                {
                    return NotFound();
                }

                var urlSlug = String.Format(Constants.urlSlugFormat, "Tags", Regex.Replace(model.Name, " ", "_"));

                entity.Name = model.Name;
                entity.UrlSlug = urlSlug;
                entity.Description = model.Description;

                _uow.TagRepository.Edit(entity);
                _uow.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Add a new tag
        /// </summary>
        [HttpPost]
        [Route("Add")]
        public IHttpActionResult Add(TagModel model)
        {
            if (ModelState.IsValid)
            {
                var urlSlug = String.Format(Constants.urlSlugFormat, "Tags", Regex.Replace(model.Name," ","_"));

                _uow.TagRepository.Add(new Tag(model.Name, urlSlug, model.Description));
                _uow.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}
