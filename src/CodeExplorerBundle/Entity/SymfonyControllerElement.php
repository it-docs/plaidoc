<?php

namespace CodeExplorerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="symfony_controller_element")
 */

class SymfonyControllerElement extends ImplementationElement
{
    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     *
     */
    private $className;

    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     *
     */
    private $methodName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $methodLineStart;
    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $methodLineEnd;

    /**
     * @return mixed
     */
    public function getClassName()
    {
        return $this->className;
    }

    /**
     * @param mixed $className
     */
    public function setClassName($className)
    {
        $this->className = $className;
    }

    /**
     * @return mixed
     */
    public function getMethodName()
    {
        return $this->methodName;
    }

    /**
     * @param mixed $methodName
     */
    public function setMethodName($methodName)
    {
        $this->methodName = $methodName;
    }

    /**
     * @return mixed
     */
    public function getMethodLineStart()
    {
        return $this->methodLineStart;
    }

    /**
     * @param mixed $methodLineStart
     */
    public function setMethodLineStart($methodLineStart)
    {
        $this->methodLineStart = $methodLineStart;
    }

    /**
     * @return mixed
     */
    public function getMethodLineEnd()
    {
        return $this->methodLineEnd;
    }

    /**
     * @param mixed $methodLineEnd
     */
    public function setMethodLineEnd($methodLineEnd)
    {
        $this->methodLineEnd = $methodLineEnd;
    }


}