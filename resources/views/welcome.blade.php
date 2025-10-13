{{-- filepath: /home/iaol/laravel_projects/Package_test_using_sail/resources/views/welcome.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vehicle Timeline</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div id="timeline-container" style="min-height: 400px;"></div>
    @vite(['resources/css/timeline.css'])
    <script type="module">
        import { createTimeline } from '/js/timeline.es.js';

        // Fetch data from API
        fetch('/api/vehicles/requisitions/1') // Replace 1 with actual vehicle ID
            .then(response => response.json())
            .then(data => {
                createTimeline('#timeline-container', data);
            });
    </script>
</body>
</html>