using iDea.DAL.Models;
using iDea.Domains.Contracts;
using iDea.Domains.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace iDea.DAL.Controllers
{
    [RoutePrefix("api/Contacts")]
    public class ContactsController : ApiController
    {
        private readonly IRepository<Contact> _repos;

        public ContactsController(IRepository<Contact> repos)
        {
            _repos = repos;
        }

        /// <summary>
        /// Tags order by query
        /// </summary>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var entities = _repos.GetAll();

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = entities.Select(c => new ContactModel
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Subject = c.Subject,
                Body = c.Body,
                Website = c.Website
            }).ToList();

            return Ok(models);

        }

        /// <summary>
        /// Search email and orderby
        /// </summary>
        [Authorize]
        [HttpGet]
        [Route("Search")]
        public IHttpActionResult Search(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return BadRequest();
            }

            var entities = _repos.Get(c => c.Email == email).ToList();

            if (entities == null || entities.Count() == 0)
            {
                return NotFound();
            }

            var models = entities.Select(c => new ContactModel
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Subject = c.Subject,
                Body = c.Body,
                Website = c.Website
            }).ToList();

            return Ok(models);
        }

        /// <summary>
        /// Delete a tag
        /// </summary>
        [Authorize]
        [Authorize]
        [HttpDelete]
        [Route("Delete/{id:int}")]
        public IHttpActionResult Delete(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var entity = _repos.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            _repos.Delete(entity);
            _repos.Save();

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

            var entity = _repos.FindById(id.Value);

            if (entity == null)
            {
                return NotFound();
            }

            return Ok(new ContactModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
                Subject = entity.Subject,
                Body = entity.Body,
                Website = entity.Website
            });
        }
        /// <summary>
        /// Edit the tag
        /// </summary>
        [Authorize]
        [HttpPost]
        [Route("Edit")]
        public IHttpActionResult Edit(ContactModel model)
        {
            if (ModelState.IsValid)
            {
                var entity = _repos.FindById(model.Id);

                if (entity == null)
                {
                    return NotFound();
                }

                entity.Name = model.Name;
                entity.Subject = model.Subject;
                entity.Email = model.Email;
                entity.Body = model.Body;
                entity.Website = model.Website;

                _repos.Edit(entity);
                _repos.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Add a new tag
        /// </summary>
        [HttpPost]
        [Route("Add")]
        public IHttpActionResult Add(ContactModel model)
        {
            if (ModelState.IsValid)
            {
                _repos.Add(new Contact(model.Name, model.Email, model.Website, model.Subject, model.Body));
                _repos.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}
