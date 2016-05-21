Evolution of the standard Symfony Demo Application
==================================================

The section "Evolution history" describes the integration of a "source code documentation editor" to the standard Symfony demo application.
The section "Symfony Demo Application" is the standard readme of the symfony demo application.

Evolutions history
==================

Controller code screen :
  - Changed the link to source code for this format :
source : /home/testp1/Dev/symfony_demo/src/AppBundle/Controller/BlogController.php, class : AppBundle\Controller\BlogController, method : indexAction, page : 41 : code source and class can then be copy/pasted in phpStorm on ubuntu where the standard url based integration lead to (too) complex congiguration in ubuntu.
  - Added the links : "Edit doc" and "Save doc as xml" with an alert of success or error : this links integrate the Axel xml editor library (http://ssire.github.io/axel/).
  TODO :
    - mean term : template is default (Page), add managment of customer templates configuration and "symfony framework feature specific" elements (same with apache and postresgl features) : for example add dynamic template extensions or full generations, based on the project or vendor bundle controller names, doctrine entities / repositories names and so on...
    - short term : check axel capability of templates with html links in text.
      - status : axel project seems in standby and UI is not up to date with todays browser capabilities : a very early prototype of a JQuery/HTML5 template based editor has been started : code name "plaidoc" editor for "pla"tform "i"ntegrated "doc"umentation.
    - short term (level 1) and mean term (level 2) : manage templates and code documents in postgresql database : two (non mutualy exclusive) level of granularity : 1 : store xml documents "as is" in a db text field (so querying the xml with other db field is not possible yet full text postgres search in the xml documents are possible, and update is only possible at document level with the editor); 2 : store and manage xml document elements in db text fields, so everything is possible yet performance becomes an issue.
    - short term : refactor with asset component the coding of url/routes of axel's js asset and xml code documents.
      - status : see below assetic test is KO : next step is to integrate GruntJS (via NodeJS).
    - short term : make the needed refactoring to provide this documenting solution with axel integration, a bundle providing a "symfony project documenting service" (starting by managing axel js library version with composer).
      - status : not started
    - long term and probably never : enhance the documentation process, integrating it with symfony specific feature, phpstorm ide, ticketing systems like redmine, trello and code forge sites like github (for integrated doc / code version managment).
    - long term and probably never : add value added plugins to axel to enhance editing experience
    - long term and probably never : add parsing of source code for a tighter integration with the xml content documenting the parsed source code.
    - long term and probably never (yet really missing today): Add missing tracability between business requirements (like business specs / stories, evolution requests...), implementation code documenting, and QA test reports. Add enhanced integration of documentation of third parties components (like php / postgres / apache docs, value added tutorials found on the web...) : for example the capability to add "external links" to these third parties web documentations. Theses "external links sets" would be "project documentation centric" (not global knowledge centric : wikipedia , openclassroom and others exist for that), and defined by the project members to share and enhance knowledge in the project(s) dev team(s) on the mean / long term.

New Controller CodeExplorerController in CodeExplorerBundle :
  - This new controller adds a very first prototype of an html5 template based pure js editor : try /xmlCodeDoc/editor

KO Test of Assetic, and Code Editor Very Early Prototype enhancements (so called now "Codoc" "VEP" )  :
 - Test of assetic : commented as it doesn't work : details in french :
   - Assetic est bugué pour le moment : après 1 journée de tentatives diverses, les fichier "ouput" des blocs twig "javascipts" et "stylesheet" tel que décrit dans les best practices ne sont pas dumper tel que décrit dans ces best practices, malgrè les nettoyage de cache et autre disable/enable du controller assetic tel que préconnisé dans les post sur google, bcp de post de signalement de ce bug sans réponse de solution qui a marché....
 - Code doc editor (nickname "codoc") :
   - Very early prototyping of an editing context menu that can be triggered by a specific keyboard event ("Ctrl <anychar>" in this proto version...).
     The context menu is displayed where the mouse is, in order to minimise mouse usage.
     The menu items can be be navigated with keyboard arrows and enter to trigger the item action, sothat this menu can be totaly used either by the mouse or by the mouse or the keyboard, enabling fast "au fil de l'eau" authoring of the document content and structure whithout mouse interruption (this encourage to write more doc for the same time, which is a real issue for software documenting ;).
   - The jquery plugin contextMenu plugin (https://swisnl.github.io/jQuery-contextMenu) has been integrated for that.
 - Symfony demo little fix : the cache of classe in app_dev.php has been commented, as it was not consistent with the code examples to disable class caching given in the best practices documentation.

Bug fix of axel editor integration :
 - the edited static xml resource was not updated in the editor : added  a FileMatch in web/.htaccess (and also src/.htaccess) to avoid caching of such resources (xml, html...)

Bug fix of the template base editor prototype (so not the axel one, the other):
 - the contextMenu css and js files have not been commited in the last run wher thei contexteMenu had been integrated

Very early prototype of code document storage in postgres database via doctrine :
 - a very early data model diagram of document element stored in the database has been done : look the html document web/doc/PlaiDocModele.xhtml
 - a new  axel template HtmlPage.xhtml has been  derived from the Page.xhtml template to store the content of these document element as (x)html.
   - the compressed axel.js library as been modified directly for that : find and replaced "Fragment" by "span" sothta axel output text fragments as "span" elements and not "Fragments" element as it is not an html element.
 - creation of a part of the doctrine entities and attributes of the web/doc/PlaiDocModele.xhtml data model : the hierarchies DocElement -> ImplementationElement -> SymfonyControllerElement, and DocElement -> BusinessRequestElement
   - See folder src/CodeExplorerBundle/Entity
 - add of a link "Store in plaidoc" in the source code screen to store the document element edited with axel in this doctrine/database schema.
   - see changes in sources :
     - source_code.html.twig : added this new link
     - base.html.twig : add of ajax request storeCodeDoc() to send the document element to store
     - config.yml : add of a specific 'plaidoc' connection to the postgres database, and a specific 'plaidoc' entity manager to manage the documentElement entities in this postgres db and not in the defaut symfon_demo sqllite db.
     - SourceCodeExtension.php : added/changed the needed SymfonyControllerElement attributes : srcRelativePath, starting_line, ending_line (to build the git url of the controller in the git repository)
     - CodeExplorerController : add of the storeAction that creates the doctrine entities and store them in the database

Add of element in the project documentation, namely web resources about doctrine : web/doc/index.html

Add of this line in this readme to check pull request with another repository.

Symfony Demo Application
========================

The "Symfony Demo Application" is a reference application created to show how
to develop Symfony applications following the recommended best practices.

[![Build Status](https://travis-ci.org/symfony/symfony-demo.svg?branch=master)](https://travis-ci.org/symfony/symfony-demo)

Requirements
------------

  * PHP 5.3 or higher;
  * PDO-SQLite PHP extension enabled;
  * and the [usual Symfony application requirements](http://symfony.com/doc/current/reference/requirements.html).

If unsure about meeting these requirements, download the demo application and
browse the `http://localhost:8000/config.php` script to get more detailed
information.

Installation
------------

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

First, install the [Symfony Installer](https://github.com/symfony/symfony-installer)
if you haven't already. Then, install the Symfony Demo Application executing
this command anywhere in your system:

```bash
$ symfony demo

# if you're using Windows:
$ php symfony demo
```

If the `demo` command is not available, update your Symfony Installer to the
most recent version executing the `symfony self-update` command.

> **NOTE**
>
> If you can't use the Symfony Installer, download and install the demo
> application using Git and Composer:
>
>     $ git clone https://github.com/symfony/symfony-demo
>     $ cd symfony-demo/
>     $ composer install --no-interaction

Usage
-----

If you have PHP 5.4 or higher, there is no need to configure a virtual host
in your web server to access the application. Just use the built-in web server:

```bash
$ cd symfony-demo/
$ php app/console server:run
```

This command will start a web server for the Symfony application. Now you can
access the application in your browser at <http://localhost:8000>. You can
stop the built-in web server by pressing `Ctrl + C` while you're in the
terminal.

> **NOTE**
>
> If you're using PHP 5.3, configure your web server to point at the `web/`
> directory of the project. For more details, see:
> http://symfony.com/doc/current/cookbook/configuration/web_server_configuration.html
