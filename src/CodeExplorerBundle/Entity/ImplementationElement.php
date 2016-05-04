<?php

namespace CodeExplorerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="implementation_element")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ORM\DiscriminatorMap({"symfonyControllerElement" = "SymfonyControllerElement", "implementationElement" = "ImplementationElement"})
 */

class ImplementationElement extends DocElement
{
    //git source repository is hard coded here for this prototype...
    const GIT_SRC_REPO = 'https://github.com/delahayef/testp1/blob/master';
    
    /**
     * @ORM\Column(type="string", length=1024, nullable=true)
     *
     */
    private $gitSourceUrl;

    /**
     * @return mixed
     */
    public function getGitSourceUrl()
    {
        return $this->gitSourceUrl;
    }

    /**
     * @param mixed $gitSourceUrl
     */
    public function setGitSourceUrl($gitSourceUrl)
    {
        $this->gitSourceUrl = $gitSourceUrl;
    }


}