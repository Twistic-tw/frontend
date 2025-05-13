<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>{{ $template_name }} Catalog</title>
  <style>
    body {
      margin: 0;
      font-family: {{ $style['fieldFont'] ?? 'Arial' }};
      font-size: {{ $style['fieldSize'] ?? '14px' }};
      color: {{ $style['text'] ?? '#000000' }};
    }

    .page {
      width: 794px;
      height: 1123px;
      padding: 40px;
      background-color: {{ $style['background'] ?? '#ffffff' }};
      page-break-after: always;
    }

    .title {
      text-align: {{ $style['align'] ?? 'center' }};
      font-size: {{ $style['size'] ?? '24px' }};
      color: {{ $style['title'] ?? '#1f2937' }};
      font-weight: bold;
      margin-bottom: 30px;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .header {
      background-color: {{ $style['header'] ?? '#4f46e5' }};
      color: {{ $style['headerText'] ?? '#ffffff' }};
    }

    .header td {
      padding: 8px;
      font-weight: bold;
      border: 1px solid #ccc;
    }

    .row:nth-child(even) {
      background-color: {{ $style['rowAlternate'] ?? '#f9fafb' }};
    }

    .row td {
      padding: 8px;
      border: 1px solid #ccc;
    }

    .full-image-page {
      width: 794px;
      height: 1123px;
      page-break-after: always;
    }

    .full-image-page img {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>
</head>
<body>

  {{-- Imagen de portada --}}
  @if (!empty($images['cover']) && file_exists(public_path($images['cover'])))
    <div class="full-image-page">
      <img src="{{ public_path($images['cover']) }}" alt="Cover">
    </div>
  @endif

  {{-- Página principal con contenido --}}
  <div class="page">
    <div class="title">{{ $template_name }} Catalog</div>

    <table class="table">
      <tr class="header">
        @foreach ($fields as $field)
          <td>{{ $field }}</td>
        @endforeach
      </tr>

      @foreach ($data as $row)
        <tr class="row">
          @foreach ($fields as $field)
            <td>{{ $row[$field] ?? '' }}</td>
          @endforeach
        </tr>
      @endforeach
    </table>
  </div>

  {{-- Imagen de pie de página --}}
  @if (!empty($images['footer']) && file_exists(public_path($images['footer'])))
    <div class="full-image-page">
      <img src="{{ public_path($images['footer']) }}" alt="Footer">
    </div>
  @endif

</body>
</html>
