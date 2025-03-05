<?php

namespace App\Support;

use Illuminate\Support\Str;

class SnackBarAlert
{
    public string $id;
    public string $message;
    public string $severity;
    public int $autoHideDuration;

    public function __construct(string $message, string $severity = 'success', int $autoHideDuration = 3000)
    {
        $this->id = Str::uuid()->toString();
        $this->message = $message;
        $this->severity = $severity;
        $this->autoHideDuration = $autoHideDuration;
    }
} 