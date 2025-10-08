<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $table = 'vehicles';

    protected $primaryKey = 'KOSTL';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['KOSTL', 'name'];

    public $timestamps = true;
}
