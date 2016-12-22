///#source 1 1 /modules/idea-controllers/idea-home.js
(function () {
    'use strict';
    app.controller('HomeController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }

    }]);
})();
///#source 1 1 /modules/idea-controllers/idea-index.js
(function () {
    'use strict';
    app.controller('IndexController', ['$rootScope', '$scope', 'AuthService', '$state', function ($rootScope, $scope, AuthService, $location, $state) {

        $scope.opening = false;
        $scope.animation = '';
        $scope.loading = false;

        $rootScope.authentication = AuthService.authentication;

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.logout = function () {
            AuthService.logOut();
        }

        $scope.toggle = function () {
            $scope.opening = $scope.opening == true ? false : true;
        }

    }])
})();
///#source 1 1 /modules/idea-controllers/idea-login.js
(function () {
    'use strict';
    app.controller('LoginController', ['$rootScope', '$scope', '$timeout', 'AuthService', '$state', function ($rootScope, $scope, $timeout, AuthService, $state) {

        $scope.message = "";

        $scope.login = function () {
            $rootScope.isLoading = true;
            AuthService.login({ userName: $scope.username, password: $scope.password }).then(function (response) {
                $state.go('admin');
                $rootScope.isLoading = false;
            }, function (err) {
                $scope.message = err.error_description;
            });
        };

        $scope.forgetPwd = function () {
            $state.go('^.forget')
        }
    }]);
})();
///#source 1 1 /modules/idea-controllers/idea-posts.js
(function () {
    app.controller('PostController', ['$rootScope', '$scope', '$state', 'PostService', function ($rootScope, $scope, $state, PostService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $state.go('search', {
                'title': $scope.title
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/post/idea-post-details.js
(function () {
    app.controller('PostDetailController', ['$rootScope', '$scope', 'PostService', '$state', '$stateParams', function ($rootScope, $scope, PostService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.postId = $stateParams.id;

            PostService.getById($scope.postId).then(function (response) {
                $scope.post = response;
            });

            PostService.posts().then(function (response) {
                $scope.posts = response;
                $rootScope.isLoading = false;
            });
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/post/idea-admin-post.js
(function () {

    app.controller('PostDashController', ['$rootScope', '$scope', '$state', 'PostService', function ($rootScope, $scope, $state, PostService) {

        $scope.addPost = function () {
            $state.go('admin.posts.add', {})
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/post/idea-post-add.js
(function () {
    app.controller('AddPostController', ['$rootScope', '$scope', 'PostService', 'CategorieService', 'TagService', '$state', function AddPostController($rootScope, $scope, PostService, CategorieService, TagService, $state) {

        $scope.selectTags = [];
        $scope.selectCategory = {};

        $scope.body = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $rootScope.tags = response;
            });

            CategorieService.categories().then(function (response) {
                $rootScope.categories = response;
            });
        });
    }])
})();

///#source 1 1 /modules/idea-controllers/category/idea-admin-category.js
(function () {
    app.controller('CategoryDashController', ['$rootScope', '$scope', 'CategorieService', '$state', function ($rootScope, $scope, CategorieService, $state) {
        $scope.addCategory = function () {
            $state.go('admin.categories.add')
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/category/idea-category-details.js
(function () {
    app.controller('CategoryDetailController', ['$rootScope', '$scope', 'CategorieService', '$state', '$stateParams', function ($rootScope, $scope, CategorieService,  $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.getById($stateParams.id).then(function (response) {
                $scope.category = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/category/idea-category-delete.js
(function () {
    app.controller('DeleteCategoryController', ['$rootScope', '$scope', '$state', '$stateParams', 'CategorieService', function ($rootScope, $scope, $state, $stateParams, CategorieService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.id = $stateParams.id;
        });

        $scope.delete = function () {
            $rootScope.isLoading = true;

            CategorieService.delete($scope.id).then(function (response) {
                $rootScope.isLoading = false;
                $state.go('admin.categories');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/category/idea-category-edit.js
(function (app) {
    app.controller('EditCategoryController', ['$rootScope', '$scope', 'CategorieService', '$state', '$stateParams', function ($rootScope, $scope, CategorieService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.getById($stateParams.id).then(function (response) {
                $scope.category = response;
                console.log(response);
            }, function (error) {

            })
        });

        $scope.edit = function () {
            $rootScope.isLoading = true;
            var data = {
                id: $scope.category.id,
                name: $scope.category.name,
                description: $scope.category.description
            }

            CategorieService.edit(data).then(function (response) {
                $state.go('admin.categories');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})(app);
///#source 1 1 /modules/idea-controllers/category/idea-category-add.js
(function () {
    app.controller('AddCategoryController', ['$rootScope', '$scope', 'TagService', '$state', function ($rootScope, $scope, TagService, $state) {

        $scope.submit = function () {
            $rootScope.isLoading = true;
            var data = {
                name: $scope.name,
                description: $scope.description
            }

            TagService.add(data).then(function (response) {
                $state.go('admin.categories');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/category/idea-categories.js
(function () {
    app.controller('CategorieController', ['$rootScope', '$scope', 'CategorieService', '$state', function ($rootScope, $scope, CategorieService, $state) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {
                
            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/admin/idea-admin.js
(function () {
    app.controller('AdminController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService) {
            
    }]);
})();
///#source 1 1 /modules/idea-controllers/admin/idea-admin-sidenav.js
(function () {
    app.controller('AdminSidenavController', ['$scope', '$state', function ($scope, $state) {

        $scope.goToTags = function () {
            $state.go('admin.tags', {});
        }

        $scope.goToPost = function () {
            $state.go('admin.posts', {});
        }

        $scope.goToDash = function () {
            $state.go('admin.dashboard', {});
        }

        $scope.goToCateg = function () {
            $state.go('admin.categories', {});
        }

        $scope.goToCont = function () {
            $state.go('admin.contacts', {});
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/admin/idea-admin-dash.js
(function () {
    app.controller('DashboardController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', 'ContactService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService, ContactService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            //$rootScope.isLoading = false;
            PostService.posts().then(function (response) {
                $rootScope.posts = response;
            });

            CategorieService.categories().then(function (response) {
                $rootScope.categories = response;
            });

            TagService.tags().then(function (response) {
                $rootScope.tags = response;
            });

            ContactService.contacts().then(function (response) {
                $rootScope.contacts = response;
                $rootScope.isLoading = false;
            })
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-search.js
(function () {
    app.controller('SearchController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {
        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.title = $stateParams.title;
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
                $rootScope.isLoading = false;
            });

            $rootScope.isLoading = false;
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
                $rootScope.isLoading = false;
            }, function (error) {
                $rootScope.isLoading = false;
            });
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/contact/idea-contacts.js
(function () {
    app.controller('AddContactController', ['$rootScope', '$scope', 'ContactService', function ($rootScope, $scope, ContactService) {
        $scope.submit = function () {
            $rootScope.isLoading = true;

            var data = {
                name: $scope.fullName,
                email: $scope.contactEmail,
                subject: $scope.subject,
                website: $scope.website == undefined ? 'N/A' : $scope.website,
                body: $scope.message
            }

            ContactService.add(data).then(function (response) {
                $scope.fullName = undefined;
                $scope.contactEmail = undefined;
                $scope.subject = undefined;
                $scope.website = undefined;
                $scope.message = undefined;

                $scope.contactForm.$setValidity();
                $scope.contactForm.$setPristine();
                $scope.contactForm.$setUntouched();

                $rootScope.isLoading = false;

            }, function (error) {
                alert('Error! Unable to submit your message.');
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/contact/idea-admin-contact.js
(function () {
    app.controller('ContactDashController', ['$rootScope', '$scope', '$state', 'ContactService', function ($rootScope, $scope, $state, ContactService) {
        $scope.addReply = function () {
            $state.go('admin.contact.reply')
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/contact/idea-contact-details.js
(function () {
    app.controller('ContactDetailController', ['$rootScope', '$scope', 'ContactService', '$state', '$stateParams', function ($rootScope, $scope, ContactService,  $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            ContactService.getById($stateParams.id).then(function (response) {
                $scope.contact = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/tags/idea-admin-tag.js
(function () {
    app.controller('TagDashController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', '$log', function ($rootScope, $scope, TagService, $state, $stateParams, $log) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $rootScope.tags = response;
            })
        });

        $scope.addTag = function () {
            $state.go('admin.tags.add')
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/tags/idea-tag-add.js
(function () {
    app.controller('AddTagController', ['$rootScope', '$scope', 'TagService', '$state', function ($rootScope, $scope, TagService, $state) {

        $scope.submit = function () {
            $rootScope.isLoading = true;
            var data = {
                name: $scope.name,
                description: $scope.description
            }

            TagService.add(data).then(function (response) {
                $state.go('admin.tags');
                $rootScope.isLoading = false;
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/tags/idea-tag-details.js
(function () {
    app.controller('TagDetailController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.getById($stateParams.id).then(function (response) {
                $scope.tag = response;
            }, function (error) {

            })
        });

        //$scope.search = function () {
        //    $rootScope.isLoading = true;
        //    $state.go('search', { 'title': $scope.title })
        //}
    }])
})();
///#source 1 1 /modules/idea-controllers/tags/idea-tag-edit.js
(function () {
    app.controller('EditTagController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.getById($stateParams.id).then(function (response) {
                $scope.tag = response;
            }, function (error) {

            })
        });

        $scope.edit = function () {
            $rootScope.isLoading = true;
            var data = {
                id: $scope.tag.id,
                name: $scope.tag.name,
                description: $scope.tag.description
            }

            TagService.edit(data).then(function (response) {
                $rootScope.isLoading = false;
                $state.go('admin.tags');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/tags/idea-tag-delete.js
(function () {
    app.controller('DeleteTagController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.id = $stateParams.id;
        });

        $scope.delete = function () {
            $rootScope.isLoading = true;

            TagService.delete($scope.id).then(function (response) {
                $rootScope.isLoading = false;
                $state.transitionTo('admin.tags');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/tags/idea-tags.js
(function () {
    app.controller('TagController', ['$rootScope', '$scope', 'TagService', '$state', function ($rootScope, $scope, TagService, $state) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $scope.tags = response;
            }, function (error) {

            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }

    }])
})();
