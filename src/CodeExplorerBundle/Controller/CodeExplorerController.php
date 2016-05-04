<?php


namespace CodeExplorerBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use DOMDocument;
use DOMXPath;
use CodeExplorerBundle\Entity\SymfonyControllerElement;

/**
 * Controller used to save source file documentation.
 *
 * @Route("/xmlCodeDoc")
 *
 * @author Franck Delahaye
 */
class CodeExplorerController extends Controller
{
    /**
     * @Route("/save", name="save_code_doc")
     * @Method("POST")
     * @Cache(smaxage="10")
     */
    public function saveAction(Request $request)
    {

        try {
            $content = file_get_contents('php://input');
            $doc = new DOMDocument("1.0", "UTF-8");
            $doc->loadXML($content);
            $docFileElement = $doc->getElementsByTagName('xmlCodeDocFile');
            $docFile = $docFileElement[0]->textContent;
            $codeDocContent=$docFileElement[0]->nextSibling;
            $codeDoc = new DOMDocument("1.0", "UTF-8");
            $newNode = $codeDoc->importNode($codeDocContent,True);
            $codeDoc->appendChild($newNode);
            $res = $codeDoc->save($docFile);
            $response = new Response("<OK>document has been saved.</OK>", 200, array('Content-Type'=> 'application/xml; charset=UTF-8'));
            $response->setCharset("UTF-8");
            if (!$res) {
                $response->setStatusCode(500);
                $response->setContent("<KO>save of code document in file $docFile failed.</KO>");
            }
            return $response;
        } catch (\Exception $e) {
            return new Response("<KO>Exception : code : {$e->getCode()} : {$e->getMessage()}</KO>",500,array('Content-Type'=> 'application/xml; charset=UTF-8'));
        } catch (\Error $e) {
            return new Response("<KO>Exception : code : {$e->getCode()} : {$e->getMessage()}</KO>",500,array('Content-Type'=> 'application/xml; charset=UTF-8'));
        }

    }

    /**
     * @Route("/editor", name="edit_code_doc")
     * @Method("GET")
     * @Cache(smaxage="10")
     */
    public function editAction(Request $request)
    {


            return $this->render('@CodeExplorer/template-based-editor.twig');


    }

    /**
     * @Route("/store", name="store_code_doc")
     * @Method("POST")
     * @Cache(smaxage="10")
     */
    public function storeAction(Request $request)
    {
        //TODO : implement me :
        //??store doc element??, and then :
        try {
            $res=null;
            $content = file_get_contents('php://input');
            $doc = new DOMDocument("1.0", "UTF-8");
            $doc->loadXML($content);
            $srcRelativePath = $doc->getElementsByTagName('srcRelativePath')[0]->textContent;
            $class_name = $doc->getElementsByTagName('class_name')[0]->textContent;
            $method_name = $doc->getElementsByTagName('method_name')[0]->textContent;
            $starting_line = $doc->getElementsByTagName('starting_line')[0]->textContent;
            $ending_line = $doc->getElementsByTagName('ending_line')[0]->textContent;
            $xpath = new DOMXpath($doc);
            $codeDocContent = $xpath->query('content/*')[0];
            $content = $doc->saveXML($codeDocContent);
            $docElement = new SymfonyControllerElement();
            $docElement->setContent($content);
            $docElement->setClassName($class_name);
            $docElement->setMethodName($method_name);
            $docElement->setMethodLineStart($starting_line);
            $docElement->setMethodLineEnd($ending_line);
            $docElement->setGitSourceUrl(SymfonyControllerElement::GIT_SRC_REPO . '/' . $srcRelativePath . '#L' . $starting_line);
            $em = $this->getDoctrine()->getEntityManager('plaidoc');
            $em->persist($docElement);
            $em->flush();
            $response = new Response("<OK>document has been saved.</OK>", 200, array('Content-Type'=> 'application/xml; charset=UTF-8'));
            $response->setCharset("UTF-8");
            return $response;
        } catch (\Exception $e) {
            return new Response("<KO>Exception : code : {$e->getCode()} : {$e->getMessage()}</KO>",500,array('Content-Type'=> 'application/xml; charset=UTF-8'));
        } catch (\Error $e) {
            return new Response("<KO>Exception : code : {$e->getCode()} : {$e->getMessage()}</KO>",500,array('Content-Type'=> 'application/xml; charset=UTF-8'));
        }


    }

}
