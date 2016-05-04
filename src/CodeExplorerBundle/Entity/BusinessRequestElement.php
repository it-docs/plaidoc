<?php

namespace CodeExplorerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="business_request_element")
 */


class BusinessRequestElement extends DocElement
{
    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     *
     */
    private $requesterRole;

    /**
     * @return mixed
     */
    public function getRequesterRole()
    {
        return $this->requesterRole;
    }

    /**
     * @param mixed $requesterRole
     */
    public function setRequesterRole($requesterRole)
    {
        $this->requesterRole = $requesterRole;
    }

    
}