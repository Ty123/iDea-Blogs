using iDea.DAL.Models;
using iDea.Domains.Contracts;
using iDea.Domains.Entities;
using iDea.Domains.Constants;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text.RegularExpressions;

namespace iDea.DAL.Controllers
{
    [Authorize]
    [RoutePrefix("api/Posts")]
    public class PostsController : ApiController
    {

        private readonly IUnitOfWork _uow;

        public PostsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        /// <summary>
        /// All posts
        /// </summary>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var entities = _uow.PostRepository.GetAll();

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = new List<PostDetail>();

            foreach (var entity in entities)
            {

                var tags = entity.Tags.Select(t => new TagDetail
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    UrlSlug = t.UrlSlug
                }).ToList();

                var category = _uow.CategoryRepository.Get(c => c.Id == entity.Category.Id).Select(c => new CategoryDetail
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    UrlSlug = c.UrlSlug
                }).FirstOrDefault();

                models.Add(new PostDetail
                {
                    Id = entity.Id,
                    Title = entity.Title,
                    ShortDescription = entity.ShortDescription,
                    Description = entity.Description,
                    Meta = entity.Meta,
                    UrlSlug = entity.UrlSlug,
                    Category = category,
                    Tags = tags
                });
            }

            return Ok(models);
        }

        /// <summary>
        /// Posts search by name
        /// </summary>
        [HttpGet]
        [Route("Search")]
        public IHttpActionResult Search(string title = "")
        {
            if (String.IsNullOrEmpty(title))
            {
                return BadRequest();
            }

            string tle = Regex.Replace(title, "_", " ");

            var entities = _uow.PostRepository.Get(p => p.Title == tle).ToList();

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = new List<PostDetail>();

            foreach (var entity in entities)
            {

                var tags = entity.Tags.Select(t => new TagDetail
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    UrlSlug = t.UrlSlug
                }).ToList();

                var category = _uow.CategoryRepository.Get(c => c.Id == entity.Category.Id).Select(c => new CategoryDetail
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    UrlSlug = c.UrlSlug
                }).FirstOrDefault();

                models.Add(new PostDetail
                {
                    Id = entity.Id,
                    Title = entity.Title,
                    ShortDescription = entity.ShortDescription,
                    Description = entity.Description,
                    Meta = entity.Meta,
                    UrlSlug = entity.UrlSlug,
                    Category = category,
                    Tags = tags
                });
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

            var entity = _uow.PostRepository.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            _uow.PostRepository.Delete(entity);
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

            var entity = _uow.PostRepository.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            var tags = entity.Tags.Select(t => new TagDetail
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                UrlSlug = t.UrlSlug
            }).ToList();

            var category = _uow.CategoryRepository.Get(c => c.Id == entity.Category.Id).Select(c => new CategoryDetail
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                UrlSlug = c.UrlSlug
            }).FirstOrDefault();

            return Ok(new PostDetail
            {
                Id = entity.Id,
                Title = entity.Title,
                ShortDescription = entity.ShortDescription,
                Description = entity.Description,
                Meta = entity.Meta,
                UrlSlug = entity.UrlSlug,
                Category = category,
                Tags = tags
            });
        }

        /// <summary>
        /// Edit the tag
        /// </summary>
        [HttpPost]
        [Route("Edit")]
        public IHttpActionResult Edit(PostModel model)
        {
            if (ModelState.IsValid)
            {
                var entity = _uow.PostRepository.FindById(model.Id);

                if (entity == null)
                {
                    return NotFound();
                }

                foreach (var tag in entity.Tags.ToList())
                {
                    entity.Tags.Remove(tag);
                }

                var category = _uow.CategoryRepository.FindById(model.CategoryId);

                var tags = new List<Tag>();

                foreach (var tagId in model.Tags)
                {
                    var tag = _uow.TagRepository.FindById(tagId);
                    if (tag != null)
                        tags.Add(tag);
                }

                var urlSlug = String.Format(Constants.urlSlugFormat, "Posts",Regex.Replace(model.Title, " ", "_"));

                entity.Title = model.Title;
                entity.ShortDescription = model.ShortDescription;
                entity.Description = model.Description;
                entity.UrlSlug = urlSlug;
                entity.Modified = DateTime.Now;
                entity.Category = category;
                entity.Tags = tags;

                _uow.PostRepository.Edit(entity);
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
        public IHttpActionResult Add(PostModel model)
        {
            if (ModelState.IsValid)
            {
                var category = _uow.CategoryRepository.FindById(model.CategoryId);
                var tags = new List<Tag>();

                foreach (var tagId in model.Tags)
                {
                    var tag = _uow.TagRepository.FindById(tagId);
                    if (tag != null)
                        tags.Add(tag);
                }

                var urlSlug = String.Format(Constants.urlSlugFormat, "Posts", Regex.Replace(model.Title, " ", "_"));

                _uow.PostRepository.Add(new Post(model.Title, model.ShortDescription, model.Description, model.Meta, urlSlug, DateTime.Now, category, tags));
                _uow.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}
