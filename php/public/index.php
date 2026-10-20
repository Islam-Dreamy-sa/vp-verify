<?php
@mkdir(__DIR__ . '/../storage');
$w = @file_put_contents(__DIR__ . '/../storage/hit.txt', date('c')) !== false ? 'storage ok' : 'storage FAILED';
echo "php ok uid=" . getmyuid() . " " . $w;
