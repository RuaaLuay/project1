<?php

namespace App\DataTables;

use App\Models\Admin;
use Spatie\Permission\Models\Role;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;

class AdminsDataTable extends DataTable
{
    /**
     * Build the DataTable class.
     *
     * @param QueryBuilder $query Results from query() method.
     */
    public function dataTable(QueryBuilder $query): EloquentDataTable
    {
        return (new EloquentDataTable($query))
            ->addIndexColumn()
            ->rawColumns(['admin'/*, 'last_login_at'*/])
            ->editColumn('admin', function (Admin $admin) {
                return view('Admin.Pages.admin-managment.columns._admin', compact('admin'));
            })->addColumn('role', function (Admin $admin) {
                $roles = [];
                foreach ($admin->roles as $role) {
                    $roles[] = $role->name;
                }
                return $roles;
            })
            //filter method
//            ->editColumn('role', function (User $user) {
//                return ucwords($user->roles->first()?->name);
//            })
//            ->editColumn('last_login_at', function (User $user) {
//                return sprintf('<div class="badge badge-light fw-bold">%s</div>', $user->last_login_at ? $user->last_login_at->diffForHumans() : $user->updated_at->diffForHumans());
//            })
            ->editColumn('created_at', function (Admin $admin) {
                return $admin->created_at/*->format('d M Y, h:i a')*/ ;
            })
            ->addColumn('action', function (Admin $admin) {
                return view('Admin.Pages.admin-managment.columns._actions', compact('admin'));
            })
            ->/*setRowId('id')->*/ filter(function ($query) {
                $request = request();
                $search = $request->search['value'];
                $query->when(!empty($search), function ($q) use ($search) {
                    $columns = $this->getSearchableColumns();
                    return $q->where(function ($q) use ($search, $columns) {
                        foreach ($columns as $column) {
                            $q->orWhere($column, 'like', "%$search%");
                        }
                        return $q;
                    });
                });

            })/*->toJson()*/ ;
    }


    /**
     * Get the query source of dataTable.
     */
    public function query(Admin $model): QueryBuilder
    {
        return $model->newQuery();
    }

    /**
     * Optional method if you want to use the html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
            ->setTableId('admins-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->dom('rt' . "<'row'<'col-sm-12 col-md-5'l><'col-sm-12 col-md-7'p>>",)
            ->addTableClass('table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer text-gray-600 fw-semibold')
//            ->setTableHeadClass('text-start text-muted fw-bold fs-7 text-uppercase gs-0')
            ->orderBy(2)
            ;
//            ->drawCallback("function() {" . file_get_contents(resource_path('views/Admin/Pages/user-managment/columns/_draw-scripts.js')) . "}");
    }

    /**
     * Get the dataTable columns definition.
     */
    public function getColumns(): array
    {
        return [
//            Column::make('ID')->incremental(),
            Column::make('admin')->addClass('d-flex align-items-center')->name('name'),
            Column::computed('role')
                ->addClass('text-nowrap')
                ->label('Role') // Set a label for the column
            ,
//            Column::make('role')->searchable(false),
//            Column::make('last_login_at')->title('Last Login'),
            Column::make('created_at')->title('Joined Date')->addClass('text-nowrap'),
            Column::computed('action')
                ->addClass('text-end text-nowrap')
                ->exportable(false)
                ->printable(false)
                ->width(60),
        ];
        //searchable
    }

    /**
     * Get the filename for export.
     */
    protected function filename(): string
    {
        return 'admins_' . date('YmdHis');
    }

    private function getSearchableColumns()
    {
        return [
            'name',
            'email',
            'created_at'
        ];
    }
}
