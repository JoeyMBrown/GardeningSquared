<?php

namespace App\Support;

use Illuminate\Support\Str;

enum SnackBarSeverity: string
{
    case SUCCESS = 'success';
    case INFO = 'info';
    case WARNING = 'warning';
    case ERROR = 'error';
}

class SnackBarAlert
{
    public string $id;
    public string $message;
    public SnackBarSeverity $severity;
    public int $autoHideDuration;

    public function __construct(
        string $message,
        SnackBarSeverity $severity = SnackBarSeverity::SUCCESS,
        int $autoHideDuration = 3000
    ) {
        $this->id = Str::uuid()->toString();
        $this->message = $message;
        $this->severity = $severity;
        $this->autoHideDuration = $autoHideDuration;
    }
} 