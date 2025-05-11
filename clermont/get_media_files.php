<?php
header('Content-Type: application/json');

function scanDirectory($dir) {
    $result = [];
    $files = scandir($dir);
    
    foreach($files as $file) {
        if ($file === '.' || $file === '..') continue;
        
        $path = $dir . '/' . $file;
        if (is_dir($path)) {
            $result = array_merge($result, scanDirectory($path));
        } else {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            $type = in_array($ext, ['jpg', 'jpeg', 'png']) ? 'image' : (in_array($ext, ['mp4', 'webm']) ? 'video' : null);
            
            if ($type) {
                $result[] = [
                    'type' => $type,
                    'src' => str_replace($_SERVER['DOCUMENT_ROOT'], '', $path)
                ];
            }
        }
    }
    
    return $result;
}

$mediaFiles = array_merge(
    scanDirectory(__DIR__ . '/photos'),
    scanDirectory(__DIR__ . '/videos')
);

echo json_encode($mediaFiles);
?>
